"use client";
import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

// assets
import ThreeDots from "assets/components/ThreeDots";
import EditIcon from "assets/components/EditIcon";
import Trash from "assets/components/Trash";

interface MenuProps {
  id: string;
  onClick?: (item?: any) => void;
}

const Menu: React.FC<MenuProps> = ({ id, onClick }) => {
  const [open, setOpen] = useState(false);

  const outsideRef = useDetectClickOutside({
    onTriggered: () => setOpen(false)
  });

  const handleDelete = async () => {
    const response = await onClick?.();
    console.log({ response });
  };

  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="w-full flex justify-start items-center bg-white cursor-pointer relative"
    >
      <ThreeDots width={15} height={15} className="z-[2]" />

      {open && (
        <ul
          ref={outsideRef}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col justify-center items-start bg-white absolute right-0 bottom-[-90px] border border-gray-200 h-fit z-[3] rounded-md"
        >
          <li className="w-full px-[16px] py-[8px] flex justify-between items-center gap-[12px] bg-white hover:bg-gray-100">
            <p>Edit</p>
            <EditIcon width={12} height={12} />
          </li>
          <li
            onClick={handleDelete}
            className="w-full px-[16px] py-[8px] flex justify-between items-center gap-[12px] bg-white hover:bg-gray-100"
          >
            <p>Delete</p>
            <Trash width={12} height={12} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
