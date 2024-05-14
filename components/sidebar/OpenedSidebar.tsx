"use client";

import React from "react";
import { Hint } from "../Hint";
import { IoMenu } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import useSidebar from "@/hooks/useSideBar";
import { IoSettingsOutline } from "react-icons/io5";
import { UserButton } from "@clerk/nextjs";

const OpenedSidebar = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="fixed h-screen w-[280px] bg- shadow-lg  flex flex-col justify-between">
      <div>
        <Hint label="Collapse Menu" side="right" asChild>
          <div
            onClick={toggle}
            className="flex items-center justify-center rounded-full h-[50px] m-[10px] cursor-pointer w-[50px]"
          >
            <IoMenu className="text-[#fff] text-2xl" />
          </div>
        </Hint>
        <Hint label="New Chat" side="right" asChild>
          <div className="text-white flex gap-x-6 w-fit ml-4 px-4  items-center justify-center h-[50px] mt-8 rounded-full text-md cursor-pointer">
            <FaPlus className="text-[#fff] text-2xl" />
            <p>New Chat</p>
          </div>
        </Hint>
      </div>
      <div>
        <Hint label="Settings" side="right" asChild>
          <div className="text-white flex gap-x-4 w-fit ml-4 px-4  items-center justify-center h-[50px] mt-8 rounded-full text-md font-semibold cursor-pointer">
            <IoSettingsOutline className="text-[#fff] text-2xl" />
            <p>Settings</p>
          </div>
        </Hint>
        <Hint label="Profile" side="right" asChild>
          <div className="text-white flex gap-x-4 w-fit ml-4 px-4  items-center justify-center h-[50px] mt-2 rounded-full text-md font-semibold cursor-pointer">
            <UserButton />
            <p>Profile</p>
          </div>
        </Hint>
      </div>
    </div>
  );
};

export default OpenedSidebar;
