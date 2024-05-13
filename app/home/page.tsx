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
  const [data, setData] = useState<string>("");

  // const handleUpload = async () => {
  //   try {
  //     const text = await GetPDF();
  //     setData(text);
      
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong while uploading file");
  //   }
  // };

  useEffect(() => {
    const pdfUrl =
      "https://utfs.io/f/877538c9-48c4-4561-87e1-a1cf737dcd5f-v5ud9p.pdf";
    // UploadPDFContentToVectorDB(pdfUrl);
    const query = "How is Amrok related to her?"
    RAG(query);
  }, []);


  return (
    // <div className="flex">
    //   <Sidebar />
    //   <div
    //     className={
    //       isOpen
    //         ? "ml-[280px] bg-[#0e0e0f] w-full min-h-screen text-white flex flex-col gap-y-2"
    //         : "ml-[70px] bg-[#0e0e0f] w-full min-h-screen text-white flex flex-col gap-y-2"
    //     }
    //   >
    //     <Navbar />
    //     <Hero />
    //     <BottomInput />
    //   </div>
    // </div>

    <div>
    </div>
  );
};

export default HomePage;
