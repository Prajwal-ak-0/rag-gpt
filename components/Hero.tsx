"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
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

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

const ConversationPage = () => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  // const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

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
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/chat", { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);

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

  return (
    <div className="h-full">
      <div className="pt-8 mb-8">
        <Heading
          title="Conversation"
          description="Our most advanced conversation model."
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
      </div>
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
            {messages.length === 0 && !isLoading ? (
              <>
                <div
                  className="flex flex-col  gap-y-4 h-[calc(72vh-200px)] overflow-y-auto"
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
                        message.role === "user"
                          ? "bg-white border border-black/10"
                          : "bg-muted"
                      )}
                    >
                      {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
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
                        message.role === "user"
                          ? "bg-emerald-50 border dark:bg-[#080a35] border-black/10"
                          : "dark:bg-[#390b49] bg-purple-100"
                      )}
                    >
                      {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
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
            mx-4
            mb-4
            border
            px-3
            md:px-8
            focus-within:shadow-sm
            grid
            grid-cols-12
          "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 mt-2 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Who is Virat Kohli? "
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 m-2 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
