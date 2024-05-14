"use server";

import { Document } from "@langchain/core/documents";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { currentUser } from "@clerk/nextjs/server";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import {
  RunnableBinding,
  RunnableLambda,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { createClient } from "@supabase/supabase-js";
import client from "@/lib/db";
import { pull } from "langchain/hub";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { HandlebarsPromptTemplate } from "langchain/experimental/prompts/handlebars";

enum SenderType {
  USER,
  BOT,
}

// Take URL as the input and return the document(Containing the content of the PDF)
export const UploadPDFContentToVectorDB = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  const userId = await getUserId();

  if (typeof userId === "string") {
    chunkAndStoreInVectorDB(docs, userId);
  } else {
    console.error(userId.error);
  }
};

const chunkAndStoreInVectorDB = async (
  docs: Document<Record<string, any>>[],
  userId: string
) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 100,
    separators: ["\n\n", "\n", " ", ""],
  });

  const splits = await textSplitter.splitDocuments(docs);

  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY!,
      model: "text-embedding-ada-002",
    }),
    { pineconeIndex }
  );

  await vectorStore.addDocuments(splits, { namespace: userId });

  console.log("Documents added to Pinecone");
};

export const RAG = async (query: string) => {
  const userId = await getUserId();

  let updatedQ: string;

  if (typeof userId === "string") {
    updatedQ = await updatedQuery(userId, query);
  } else {
    console.error(userId.error);
    updatedQ = "";
  }

  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY!,
      model: "text-embedding-ada-002",
    }),
    { pineconeIndex }
  );

  const searchResults = await vectorStore
    .asRetriever({
      filter: {
        namespace: userId,
      },
      k: 2,
    })
    .invoke(updatedQ);

  const result = finalLLM(updatedQ, searchResults);
  return result;
};

const finalLLM = async (
  query: string,
  docs: Document<Record<string, any>>[]
) => {
  const userId = await getUserId();

  if (typeof userId !== "string") {
    console.error(userId.error);
    return;
  }

  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY!,
  });

  const template = `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Use three sentences maximum and keep the answer as concise as possible. Always say "thanks for asking!" at the end of the answer.
  {context}
  Question: {question}
  Helpful Answer:`;

  const customRagPrompt = PromptTemplate.fromTemplate(template);

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt: customRagPrompt,
    outputParser: new StringOutputParser(),
  });

  const result = await ragChain.invoke({
    context: docs,
    question: query,
  });

  updateQueryInDB(userId, query);
  updateHistoryInDB(userId, query, SenderType.USER);
  updateHistoryInDB(userId, result, SenderType.BOT);

  console.log("Final result: ", result);

  return result;
};

const retrieveHistory = async (userId: string) => {
  try {
    if (!userId) {
      return {
        error: "User ID not found!",
      };
    }

    const history = await client.chatHistory.findMany({
      where: {
        clerkId: String(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const formattedMessages = history.map((message) =>
      message.sender === "USER"
        ? new HumanMessage(message.message)
        : new AIMessage(message.message)
    );

    return formattedMessages.reverse();
  } catch (error) {
    console.log("Error in retrieving history: ", error);
    return {
      error: "Error in retrieving history",
    };
  }
};

const updatedQuery = async (userId: string, query: string) => {
  const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
  const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");
  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const contextualizeQSystemPrompt = `Given a chat history and the latest user question which might reference context in the chat history formulate a standalone question which can be understood without the chat history. Do NOT answer the question, just reformulate it if needed and otherwise return it as is.`;

  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);

  const contextualizeQChain = contextualizeQPrompt
    .pipe(llm)
    .pipe(new StringOutputParser());

  const history = await retrieveHistory(userId);

  const updatedQ = await contextualizeQChain.invoke({
    chat_history: history,
    question: query,
  });

  return updatedQ;
};

const updateHistoryInDB = async (
  userId: string,
  message: string,
  sender: SenderType
) => {
  try {
    await client.chatHistory.create({
      data: {
        clerkId: userId,
        message: message,
        sender: sender === SenderType.USER ? "USER" : "BOT",
      },
    });
  } catch (error) {
    console.log("Error in updating history: ", error);
  }
};

const updateQueryInDB = async (userId: string, query: string) => {
  try {
    await client.query.create({
      data: {
        clerkId: userId,
        query: query,
      },
    });
  } catch (error) {
    console.log("Error in updating query: ", error);
  }
};

const getUserId = async () => {
  const userClerkData = await currentUser();

  if (!userClerkData?.id) {
    return {
      error: "User ID not found!",
    };
  }

  const userId = userClerkData.id;

  return userId;
};
