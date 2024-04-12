import React from "react";
import Image from "next/image";
import type * as CSS from "csstype";
import ArrowDown from "assets/components/ArrowDown";

// types
import { ClinicObjectType } from "types/axiosTypes";

interface ComponentProps {
  styles?: CSS.Properties;
  data: ClinicObjectType;
  onClick?: (
    data: ClinicObjectType,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const InfoCard: React.FC<ComponentProps> = ({ styles, data, onClick }) => {
  return (
    <div
      className="relative w-full dflex-center !items-start flex-col text-black rounded-lg overflow-hidden group"
      style={styles}
    >
      <Image
        width={368}
        height={276}
        src="https://source.unsplash.com/white-concrete-counter-stand-nMyM7fxpokE"
        alt="some"
        className="w-full"
      />

      <div className="absolute bottom-0 w-full dflex-start flex-col gap-3 bg-white z-10 p-3 h-full translate-y-[80%] group-hover:translate-y-0 showTransition">
        <h3 className="w-full text-xl font-medium">{data?.name ?? "Name"}</h3>
        <p className="text-sm text-gray-400 max-h-[40%] overflow-hidden text-ellipsis line-clamp-4 ">
          {data?.description ??
            ` Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.`}
        </p>

        <div className="w-full dflex-end gap-4 mt-auto">
          <button
            onClick={(e) => onClick?.(data, e)}
            className="w-8 h-8 dflex-center bg-themeSidebarBlue shadow-lg rounded-full cursor-pointer"
          >
            <ArrowDown
              style={{
                transform: "rotate(-90deg)",
                left: 2,
                position: "relative"
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
