import React from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import banner1 from "assets/images/banner1.jpg";
import banner2 from "assets/images/banner2.jpg";

import "@splidejs/splide/css";

const data = [
  {
    id: 0,
    image: banner1
  },
  {
    id: 1,
    image: banner2
  }
];

const Carousel = () => {
  const splideOptions = {
    type: "loop",
    width: "100%",
    drag: false,
    gap: "1rem",
    pagination: true,
    perPage: 1,
    perMove: 1,
    interval: 2000,
    snap: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    autoplay: true,
    arrows: true,
    classes: {
      pagination: "splide__pagination"
    }
  };
  return (
    <Splide className="h-[300px] overflow-hidden" options={splideOptions}>
      {data?.map((banner, index) => {
        return (
          <SplideSlide className="w-full h-full overflow-hidden" key={index}>
            <div className=" bg-red-200 flex justify-center items-center h-full">
              <Image
                width={1232}
                height={200}
                className="object-cover flex justify-center items-center"
                src={banner.image}
                alt=""
              />
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default Carousel;
