import React from "react";

interface ComponentProps {
  children: React.ReactNode;
  title: string;
  showHeaderSiblings?: boolean;
  headerSiblings?: React.ReactNode;
}

const SubContainer: React.FC<ComponentProps> = ({
  title,
  children,
  showHeaderSiblings = false,
  headerSiblings
}) => {
  return (
    <div className="w-full dflex-start flex-col p-8 gap-8">
      {/* TITLE AND BUTTONS */}
      <div className="w-full dflex-between">
        <h2 className="text-3xl text-themeSidebarBlue">{title}</h2>
        {showHeaderSiblings && headerSiblings}
      </div>
      {children}
    </div>
  );
};

export default SubContainer;
