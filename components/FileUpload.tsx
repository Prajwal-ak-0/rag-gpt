"use client";

import { toast } from "sonner";

import { UploadDropzone } from "@/utils/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import axios from "axios";
import { useEffect, useState } from "react";
interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  
  const [url, setUrl] = useState<string>("");

  const handleUpload = async () => {
    try {
      const res = await axios.get("/api/pdf/read");
      console.log("RES", res);
      toast.success("File uploaded successfully");
      if (res?.data?.error) {
        throw new Error(res?.data?.error);
      }
      setUrl(res?.data?.link);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while uploading file");
    }
  };


  // useEffect(() => {
  //   const link = 'https://utfs.io/f/dc5a4f73-4e49-4b6c-bed6-cbc63ed1726f-2gj.pdf';
  //   const corsHeaders = {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //   };
  //   fetch(`http://127.0.0.1:8000/pdf/?link=${encodeURIComponent(link)}`, {
  //     headers: corsHeaders
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //     });
  // }, []);


  useEffect(() => {
    handleUpload();
  }, []);


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
