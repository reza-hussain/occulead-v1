import React from "react";

import img1 from "public/assets/Home/img1.svg";
import img2 from "public/assets/Home/img2.svg";
import img3 from "public/assets/Home/img3.svg";
import img4 from "public/assets/Home/img4.svg";
import img5 from "public/assets/Home/img5.svg";
import HomeCard from "../HomeCard";

const data = [
  {
    id: 0,
    image: img1
  },
  {
    id: 1,
    image: img2
  },
  {
    id: 3,
    image: img3
  },
  {
    id: 4,
    image: img4
  },
  {
    id: 5,
    image: img5
  }
];

const HomeSpecialities = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-[24px]">
      <div className="w-full flex justify-between items-center ">
        <h3 className="text-xl font-[600]">
          Consult top doctors online for any health concern
        </h3>
        <button className=" p-[10px_12px] text-blue-400 flex justify-center items-center border border-blue-400 rounded-sm">
          View all specialities
        </button>
      </div>

      <div className="w-full flex justify-center items-center gap-[12px]">
        {data?.map((banner) => {
          return <HomeCard key={banner.id} item={banner} />;
        })}
      </div>
    </div>
  );
};

export default HomeSpecialities;
