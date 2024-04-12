import React from "react";
import Image from "next/image";

const HomeCard = ({ item }) => {
  return (
    <div
      key="0"
      className="flex flex-col justify-start items-center rounded-[12px] w-full basis-[20%] gap-[16px] p-[22px] border border-gray-100 shadow-[0px_0px_7px_0px_rgba(0,0,0,0.06)]"
    >
      <Image src={item.image} alt="" width={45} height={45} />
      {item.name && (
        <h3 className="text-[#1E323D] bg-white text-[24px] leading-[36px] font-[600] text-center">
          {item.name}
        </h3>
      )}
      <p className="text-[#4D576C] text-[14px] leading-[21px] mt-auto">
        This is a dummy text used to add additional context to the main heading.
      </p>
    </div>
  );
};

export default HomeCard;
