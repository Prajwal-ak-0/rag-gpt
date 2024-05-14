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
    <div className="fixed w-[70px]  shadow-lg  flex flex-col justify-between h-screen">
      <div className="">
        <Hint label="Expand Menu" side="right" asChild>
          <div
            onClick={toggle}
            className="flex items-center justify-center rounded-full h-[40px] m-[10px] ml-3  cursor-pointer bg-gradient-to-br from-[#1e2023] to-[#23272b] w-[40px]"
          >
            <IoMenu className="text-[#fff] text-xl" />
          </div>
        </Hint>
        <Hint label="New Chat" side="right" asChild>
          <div className="text-white flex gap-x-6 w-fit ml-3 px-[10px] py-1  items-center justify-center h-[40px] mt-8 rounded-full text-md cursor-pointer bg-gradient-to-br from-[#1e2023] to-[#23272b] ">
            <FaPlus className="text-[#fff] text-xl" />
          </div>
        </Hint>
      </div>
      <div>
        <Hint label="Settings" side="right" asChild>
          <div className="text-white flex gap-x-6 w-fit ml-3 px-2 py-1  items-center justify-center h-[40px] mt-8 rounded-full text-md cursor-pointer bg-gradient-to-br from-[#1e2023] to-[#23272b] ">
            <IoSettingsOutline className="text-[#fff] text-2xl" />
          </div>
        </Hint>
        <Hint label="Profile" side="right" asChild>
          <div className="text-white flex gap-x-6 w-fit ml-1 px-3 py-1  items-center justify-center h-[50px] mt-2 rounded-full text-md cursor-pointer ">
            <UserButton />
          </div>
        </Hint>
      </div>
    </div>
  );
};

export default ClosedSidebar;
