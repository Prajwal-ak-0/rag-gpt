"use client";
import Sidebar from "@/components/sidebar/Index";
import React, { useEffect, useState } from "react";
import useSidebar from "@/hooks/useSideBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BottomInput from "@/components/BottomInput";
import { exec, spawn, fork } from "child_process";
import { toast } from "sonner";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { RAG, UploadPDFContentToVectorDB } from "@/utils/Rag";

const HomePage = () => {
  const { isOpen } = useSidebar();
  const [chatContent, setChatContent] = useState([]);
  
  return (
    <div className="flex">
      <Sidebar />
      <div
        className={
          isOpen
            ? "ml-[280px] bg-[#0e0e0f] w-full min-h-screen text-white flex flex-col gap-y-2"
            : "ml-[70px] bg-[#0e0e0f] w-full min-h-screen text-white flex flex-col gap-y-2"
        }
      >
        <Navbar />
        <Hero />
        <BottomInput />
      </div>
    </div>
  );
};

export default HomePage;