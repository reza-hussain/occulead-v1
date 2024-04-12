import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const HomeTestimonials = () => {
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
    arrows: false,
    classes: {
      pagination: "splide__pagination",
      arrows: "splide__customArrows"
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-center mt-[20px]">
      <h3 className="text-2xl">What our users have to say</h3>
      <Splide
        className="h-[300px] overflow-hidden justify-center items-center flex"
        options={splideOptions}
      >
        {Array(3)
          .fill(null)
          ?.map((banner, index) => {
            return (
              <SplideSlide
                className="w-full h-full overflow-hidden"
                key={index}
              >
                <div className="w-full flex flex-col justify-center items-center h-full gap-[20px]">
                  <h3 className="text-4xl text-center">
                    Very good application for managing appointments in one
                    place. Easy to book and very systematic
                  </h3>
                  <p>Avinash Kumar</p>
                </div>
              </SplideSlide>
            );
          })}
      </Splide>
    </div>
  );
};

export default HomeTestimonials;
