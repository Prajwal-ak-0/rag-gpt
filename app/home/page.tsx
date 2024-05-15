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

  // useEffect(() => {
  //   const url = "https://utfs.io/f/0516ee1f-17c4-4c27-855b-823a5b9b8f71-2diq.pdf";
  //   const query = "Can you choose one technology from it and explain it?"
  //   RAG(query);
  // })

  return (
    <>
      <div className="md:flex hidden">
        <Sidebar />
        <div
          className={
            isOpen
              ? "ml-[280px] w-full min-h-screen text-white flex flex-col gap-y-2"
              : "ml-[70px] w-full min-h-screen text-white flex flex-col gap-y-2"
          }
        >
          <Navbar />
          {/* <Hero /> */}
        </div>
      </div>
      <div className="md:hidden">
        <Navbar />
        {/* <Hero /> */}
      </div>
    </>
  );
};

export default HomePage;
