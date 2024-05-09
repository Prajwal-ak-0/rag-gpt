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
