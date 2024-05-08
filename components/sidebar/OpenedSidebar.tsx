"use client";

import React from 'react'
import { Hint } from '../Hint'
import { IoMenu } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'
import useSidebar from '@/hooks/useSideBar';

const OpenedSidebar = () => {
    const {isOpen, toggle} = useSidebar();

  return (
    <div className="fixed h-full w-[280px] bg-[#303030]/60 shadow-lg shadow-[#303030]" >
      <Hint label="Expand Menu" side="right" asChild>
        <div
          onClick={toggle}
          className="flex items-center justify-center rounded-full h-[50px] m-[10px] hover:bg-[#303030] cursor-pointer w-[50px]"
        >
          <IoMenu className="text-[#fff] text-2xl" />
        </div>
      </Hint>
      <Hint label="New Chat" side="right" asChild>
        <div className="text-white flex gap-x-6 w-fit ml-4 px-4  items-center justify-center h-[50px] mt-8 rounded-full text-md cursor-pointer hover:bg-[#303030]">
          <FaPlus className="text-[#fff] text-2xl" />
          <p>
            New Chat
          </p>
        </div>
      </Hint>
    </div>
  )
}

export default OpenedSidebar

