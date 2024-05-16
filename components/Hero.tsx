"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { use, useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { Heading } from "./Heading";
import { Loader } from "./Loading";
import { UserAvatar } from "./UserAvatar";
import { BotAvatar } from "./BotAvatar";
import Navbar from "@/components/Navbar";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { FileUpload } from "./FileUpload";
import { RAG } from "@/utils/Rag";
import { GetHistory } from "@/utils/GetHistory";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

export type Message = {
  role: "USER" | "BOT";
  content: string;
};

const Hero = () => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  // const proModal = useProModal();
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const scrollToBottom = () => {
    if (messagesContainerRef.current && lastMessageRef.current) {
      const messagesContainer = messagesContainerRef.current;
      const lastMessage = lastMessageRef.current;

      const offset = lastMessage.offsetTop - messagesContainer.offsetTop;
      messagesContainer.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [messages]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = {
        role: "USER",
        content: values.prompt,
      };

      console.log("User Message: ", userMessage);

      const response: Message = await RAG(userMessage);
      console.log(response);
      setMessages((prevMessages) => [...prevMessages, userMessage, response]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

const getHistory = async () => {
  try {
    const history = await GetHistory();
    if (Array.isArray(history)) {
      const updatedHistory:Message[] = history.map((message) => ({
        role: message.sender,
        content: message.message,
      }));
      return updatedHistory; // return the updated history
    } else {
      return { error: "Invalid history format" };
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getHistory().then((history) => {
    if (Array.isArray(history)) {
      setMessages(history);
    }
    console.log(history);
  });
}, []);

  return (
    <div className="h-full text-black">

      <div>
        <div className="px-4 lg:px-8">
          <div className="space-y-2">
            {isLoading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                <div className="p-8 z-10 rounded-lg w-full max-w-xs ">
                  <Loader />
                </div>
              </div>
            )}
            {messages.length==0 && !isLoading ? (
              <>
                <div
                  className="flex flex-col  gap-y-4 h-[calc(100vh-180px)] overflow-y-auto"
                  ref={messagesContainerRef}
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      ref={
                        index === messages.length - 1 ? lastMessageRef : null
                      }
                      className={cn(
                        "p-8 w-full flex items-start gap-x-8 rounded-lg",
                        message.role === "USER"
                          ? "bg-white border border-black/10"
                          : "bg-muted"
                      )}
                    >
                      {message.role === "USER" ? <UserAvatar /> : <BotAvatar />}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex flex-col gap-y-4 h-[calc(88vh-200px)] mb-4 sm:h-[calc(100vh-200px)] overflow-y-auto"
                  ref={messagesContainerRef}
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      ref={
                        index === messages.length - 1 ? lastMessageRef : null
                      }
                      className={cn(
                        "p-4 w-full flex items-start gap-x-4 rounded-lg",
                        message.role === "USER"
                          ? "bg-emerald-50 border dark:bg-[#080a35] border-black/10"
                          : "dark:bg-[#390b49] bg-purple-100"
                      )}
                    >
                      {message.role === "USER" ? <UserAvatar /> : <BotAvatar />}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mb-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
            rounded-lg
            mb-4
            border
            px-3
            md:px-8
            focus-within:shadow-sm
            grid
            md:mx-20
          "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl className="m-0 p-0">
                      <Input
                        placeholder="Enter a prompt here."
                        disabled={isLoading}
                        {...field}
                      >
                        <button className="" type="submit" disabled={isLoading}>
                          <FileUpload />
                        </button>
                      </Input>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
