"use client";

import React from "react";
import { Hint } from "../Hint";
import { IoMenu } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import useSidebar from "@/hooks/useSideBar";
import { IoSettingsOutline } from "react-icons/io5";
import { UserButton } from "@clerk/nextjs";

const ClosedSidebar = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="fixed w-[70px] shadow-lg shadow-[#303030] flex flex-col justify-between h-screen">
      <div className="">
        <Hint label="Expand Menu" side="right" asChild>
          <div
            onClick={toggle}
            className="flex items-center justify-center rounded-full h-[50px] m-[10px] hover:bg-[#303030] cursor-pointer w-[50px]"
          >
            <IoMenu className="text-[#fff] text-2xl" />
          </div>
        </Hint>
        <Hint label="New Chat" side="right" asChild>
          <div className="text-white flex gap-x-6 w-fit ml-2 px-3 py-1  items-center justify-center h-[50px] mt-8 rounded-full text-md cursor-pointer hover:bg-[#303030]">
            <FaPlus className="text-[#fff] text-2xl" />
          </div>
        </Hint>
      </div>
      <div>
        
        <Hint label="Settings" side="right" asChild>
          <div className="text-white flex gap-x-6 w-fit ml-2 px-3 py-1  items-center justify-center h-[50px] mt-8 rounded-full text-md cursor-pointer hover:bg-[#303030]">
            <IoSettingsOutline className="text-[#fff] text-2xl" />
          </div>
        </Hint>
        <Hint label="Profile" side="right" asChild>
          <div className="text-white flex gap-x-6 w-fit ml-2 px-3 py-1  items-center justify-center h-[50px] mt-2 rounded-full text-md cursor-pointer hover:bg-[#303030]">
            <UserButton />
          </div>
        </Hint>
      </div>
    </div>
  );
};

export default ClosedSidebar;
