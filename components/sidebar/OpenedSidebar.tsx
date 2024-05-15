"use client";

import React, { use, useEffect, useState } from "react";
import { Hint } from "../Hint";
import { IoMenu } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import useSidebar from "@/hooks/useSideBar";
import { IoSettingsOutline } from "react-icons/io5";
import { UserButton } from "@clerk/nextjs";
import { GetUploadedFiles } from "@/utils/GetUploadedFiles";

const OpenedSidebar = () => {
  const { isOpen, toggle } = useSidebar();
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");

  const getUploadedFiles = async () => {
    const files = await GetUploadedFiles();

    if (Array.isArray(files)) {
      for (let file of files) {
        setFileName(file?.title ?? "");
        setFileLink(file?.link ?? "");
      }
    } else if ("error" in files) {
      console.error(files.error);
    }

    console.log(files);
  };

  useEffect(() => {
    getUploadedFiles();
  }, []);

  return (
    <div className="fixed h-screen w-[280px] shadow-2xl  flex flex-col justify-between">
      <div>
        <Hint label="Collapse Menu" side="right" asChild>
          <div
            onClick={toggle}
            className="flex items-center justify-center ml-4 rounded-full h-[50px] m-[10px] cursor-pointer w-[50px] "
          >
            <IoMenu className="text-white text-xl bg-gradient-to-br from-[#1e2023] to-[#23272b] w-[40px] h-[40px] px-2 py-1 rounded-full" />
          </div>
        </Hint>
        <Hint label="New Chat" side="right" asChild>
          <div className="text-black flex gap-x-6 w-fit ml-2 px-4  items-center justify-center h-[50px] mt-8 rounded-full text-md cursor-pointer">
            <FaPlus className="text-white text-xl bg-gradient-to-br from-[#1e2023] to-[#23272b] w-[40px] h-[40px] px-2 py-1 rounded-full" />
            <p>New Chat</p>
          </div>
        </Hint>
      </div>

      <div></div>

      <div>
        <p>
          <span className="text-black text-md font-semibold">
            Uploaded Files
          </span>
        </p>
        {
          <div className="flex flex-col gap-y-2 mt-4">
            <div className="flex gap-x-4 items-center">
              <p className="text-black text-md font-semibold">{fileName}</p>
              <a
                href={fileLink}
                target="_blank"
                className="text-blue-500 text-md font-semibold"
              >
                View
              </a>
            </div>
          </div>
        }
      </div>

      <div>
        <Hint label="Settings" side="right" asChild>
          <div className="text-black flex gap-x-4 w-fit ml-2 px-4  items-center justify-center h-[50px] mt-8 rounded-full text-md font-semibold cursor-pointer">
            <IoSettingsOutline className="text-white text-xl bg-gradient-to-br from-[#1e2023] to-[#23272b] w-[40px] h-[40px] px-2 py-1 rounded-full" />
            <p>Settings</p>
          </div>
        </Hint>
        <Hint label="Profile" side="right" asChild>
          <div className="text-black flex gap-x-4 w-fit ml-4 px-4  items-center justify-center h-[50px] mt-2 rounded-full text-md font-semibold cursor-pointer">
            <UserButton />
            <p>Profile</p>
          </div>
        </Hint>
      </div>
    </div>
  );
};

export default OpenedSidebar;
