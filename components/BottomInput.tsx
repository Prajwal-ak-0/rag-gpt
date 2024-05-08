import React from 'react'
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";

const BottomInput = () => {
  return (
    <div className='h-24 mx-12 rounded-xl'>
      <Input placeholder='Enter a prompt here.' >
        <IoSend className='text-[#fff]' />
        <FaFileUpload className='text-[#fff]' />
      </Input>
    </div>
  )
}

export default BottomInput