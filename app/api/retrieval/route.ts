"use server"

import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

export async function GET(req: NextRequest) {

  try {
    const url ="https://utfs.io/f/877538c9-48c4-4561-87e1-a1cf737dcd5f-v5ud9p.pdf"
    const response = await fetch(url);
    const blob = await response.blob();
    const loader = new WebPDFLoader(blob);
    const docs = await loader.load();
    let jsonContent = JSON.stringify(docs[0].pageContent);

    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!
    );

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize: 256,
      chunkOverlap: 20,
    });

    const splitDocuments = await splitter.createDocuments([jsonContent]);

    const vectorstore = await SupabaseVectorStore.fromDocuments(
      splitDocuments,
      new OpenAIEmbeddings({
        model:"text-embedding-ada-002",
        apiKey: process.env.OPENAI_API_KEY!,
      }),
      {
        client,
        tableName: "documents",
        queryName: "match_documents",
      }
    );

    const resultOne = await vectorstore.similaritySearch("Who is Amarok?", 1);
    console.log(resultOne);


    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
