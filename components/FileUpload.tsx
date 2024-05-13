"use client";

import { toast } from "sonner";
import { DownloadPDF } from "@/utils/DownloadPdf";
import { UploadDropzone } from "@/utils/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCallback } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  // const [url, setUrl] = useState<string>("");
  // const [pdf, setPdf] = useState<string>("");

  // const afterGettingLink = useCallback(async () => {
  //   try {
  //     const text = await GetPDF(url);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong while uploading file");
  //   }
  // }, [url, pdf]);

  // const getTheLink = useCallback(async () => {
  //   try {
  //     const res = await axios.get("/api/retrieval");
  //     console.log("RES", res);
  //     toast.success("File uploaded successfully");
  //     if (res?.data?.error) {
  //       throw new Error(res?.data?.error);
  //     }
  //     setUrl(res?.data?.link);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong while uploading file");
  //   }
  // }, []);

  // useEffect(() => {
  //   getTheLink();
  //   if(url) {
  //     afterGettingLink();
  //   }
  // }, [getTheLink, url, afterGettingLink]);

  // useEffect(() => {
  //   getTheLink();
  // }), [getTheLink];

  // useEffect(() => {
  //   const pdfUrl =
  //     "https://utfs.io/f/877538c9-48c4-4561-87e1-a1cf737dcd5f-v5ud9p.pdf";
  //   // DownloadPDF(pdfUrl);
  //   Rag(pdfUrl);
  // }, []);

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
