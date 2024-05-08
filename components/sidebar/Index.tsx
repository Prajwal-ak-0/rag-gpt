"use client";

import { IoMenu } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Hint } from "@/components/Hint";
import useSidebar from "@/hooks/useSideBar";
import OpenedSidebar from "./OpenedSidebar";
import ClosedSidebar from "./ClosedSidebar";

const Sidebar = () => {

  const {isOpen} = useSidebar();
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div>
        {
            isOpen ? (
                <div>
                    <OpenedSidebar/>
                </div>
            ):(
                <div>
                    <ClosedSidebar/>
                </div>
            )
        }
    </div>
  );
};

export default Sidebar;
