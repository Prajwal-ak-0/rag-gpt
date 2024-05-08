"use client";
import Sidebar from "@/components/sidebar/Index";
import React from "react";
import useSidebar from "@/hooks/useSideBar";

const HomePage = () => {
  const { isOpen } = useSidebar();
   
  return (
    <div className="flex">
      <Sidebar />
      <div className={isOpen ? "ml-[280px] bg-[#0e0e0f] w-full min-h-screen" : "ml-[70px] bg-[#0e0e0f] w-full min-h-screen "}>
        <h1>
          HELLO WORLD
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
