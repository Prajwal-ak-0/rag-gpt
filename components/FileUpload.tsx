"use client";

import { toast } from "sonner";
import { DownloadPDF } from "@/utils/DownloadPdf";
import { UploadDropzone } from "@/utils/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { RAG } from "@/utils/Rag";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {

  const GetQueryAndwer = async () => {
    const query = "How is Amrok related to her?";
    const res = await RAG(query);
    console.log(res);
  };

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("URL", res?.[0].url);
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
