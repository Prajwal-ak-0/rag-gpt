"use client";

import React from 'react'
import { Hint } from '../Hint'
import { IoMenu } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'
import useSidebar from '@/hooks/useSideBar'

const ClosedSidebar = () => {
    const {isOpen, toggle} = useSidebar();

  return (
    <div className="fixed h-full w-[70px] bg-[#303030]/60 shadow-lg shadow-[#303030]">
      <Hint label="Expand Menu" side="right" asChild>
        <div
          onClick={toggle}
          className="flex items-center justify-center rounded-full h-[50px] m-[10px] hover:bg-[#303030] cursor-pointer"
        >
          <IoMenu className="text-[#fff] text-2xl" />
        </div>
      </Hint>
      <Hint label="New Chat" side="right" asChild>
        <div className="flex items-center justify-center h-[70px]">
          <FaPlus className="text-[#fff] text-2xl" />
        </div>
      </Hint>
    </div>
  )
}

export default ClosedSidebar