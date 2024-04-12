import React from "react";

interface ComponentProps {
  title: string;
  value: string;
  showInsights?: boolean;
  insights?: string;
  profit?: boolean;
}

const Card: React.FC<ComponentProps> = ({ title, value }) => {
  return (
    <div className="w-[200px] h-[112px] dflex-center !items-start flex-col p-[24px] gap-2 rounded-2xl bg-[#4B90F8] text-white">
      <p className="leading-5">{title}</p>
      <div className="w-full dflex-start text-3xl">
        <h3>{value}</h3>
      </div>
    </div>
  );
};

export default Card;
