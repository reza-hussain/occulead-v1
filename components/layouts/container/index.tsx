import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[calc(100vw-65px)] w-full min-h-screen flex justify-start items-start bg-themeContainerWhite ml-auto">
      {children}
    </div>
  );
};

export default Container;
