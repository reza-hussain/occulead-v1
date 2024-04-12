import React, { useState } from "react";

// components
import SidebarItem from "components/layouts/sidebar/Item";

// constants
import { clinicSidebar, companySidebar } from "@/constants/sidebarItems";

// assets
import ThreeDots from "assets/components/ThreeDots";

interface ComponentProps {
  userType: "clinic" | "company";
}

const Sidebar: React.FC<ComponentProps> = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarOptions = userType === "clinic" ? clinicSidebar : companySidebar;

  const onMouseEnter = () => {
    setTimeout(() => {
      setIsOpen(true);
    }, 180);
  };

  const onMouseLeave = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  };

  return (
    <div
      className="fixed left-0 top-0 w-[65px] min-h-screen dflex-start flex-col gap-[18px] text-white bg-themeSidebarBlue p-4 overflow-auto rounded-r-md showTransition group hover:w-[250px] z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* profile */}

      {isOpen ? (
        <div className="w-full grid grid-cols-[20%_80%]">
          <div className="dflex-center w-[32px] h-[32px] rounded-full bg-white"></div>
          <div className="w-full hidden group-hover:dflex-between">
            <p>Jason Bourne</p>
            <ThreeDots />
          </div>
        </div>
      ) : (
        <div className="w-full dflex-start">
          <div className="dflex-center w-[32px] h-[32px] rounded-full bg-white"></div>
        </div>
      )}

      {sidebarOptions?.map((item) => (
        <SidebarItem key={item.title} isOpen={isOpen} {...item} />
      ))}
    </div>
  );
};

export default Sidebar;
