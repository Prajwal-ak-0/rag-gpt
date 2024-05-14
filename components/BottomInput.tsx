import * as z from "zod";
import React from "react";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { FileUpload } from "@/components/FileUpload";

const BottomInput = () => {
  return (
    <div className="h-24 mx-12 rounded-xl">
      <Input placeholder="Enter a prompt here.">
        <FileUpload />
      </Input>
    </div>
  );
};

export default BottomInput;
