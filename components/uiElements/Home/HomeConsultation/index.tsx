import React from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
  {
    id: 0,
    image:
      "https://source.unsplash.com/doctor-holding-red-stethoscope-hIgeoQjS_iE",
    title: "Cardio Surgeon",
    content: "Get the best doctors for this service"
  },
  {
    id: 1,
    image:
      "https://source.unsplash.com/a-doctor-talking-to-a-pregnant-woman-in-a-waiting-room-c8fnD1rKGCk",
    title: "Gynecologist",
    content: "Get the best doctors for this service"
  },
  {
    id: 3,
    image:
      "https://source.unsplash.com/heart-shaped-bowl-with-strawberries-tb5A-QTI6xg",
    title: "Nutrition",
    content: "Get the best doctors for this service"
  },
  {
    id: 4,
    image:
      "https://source.unsplash.com/person-massaging-other-persons-foot-5S40ixhBK-I",
    title: "Physiotherapy",
    content: "Get the best doctors for this service"
  }
];

const HomeConsultation = () => {
  const router = useRouter();
  const splideOptions = {
    width: "auto",
    drag: false,
    gap: "1rem",
    perPage: 4,
    perMove: 1,
    snap: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: true,
    pagination: false,
    classes: {
      pagination: "splide__pagination",
      arrows: "splide__customArrows"
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-center gap-[24px] overflow-hidden">
      <div className="w-full flex justify-between items-center ">
        <h3 className="text-xl font-[600]">
          Book an appointment for an in-clinic consultation
        </h3>
        <p>Find experienced doctors across all specialties</p>
      </div>
      <Splide className="w-full" options={splideOptions}>
        {data?.map((banner, index) => {
          return (
            <SplideSlide
              className="w-full h-full overflow-hidden cursor-pointer"
              key={index}
            >
              <div
                className="flex flex-col justify-start items-start"
                onClick={() => router.push("/home/doctors")}
              >
                <div className="overflow-hidden w-[300px] h-[200px]">
                  <Image
                    src={banner.image}
                    alt=""
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-[16px] font-[500]">{banner.title}</h3>
                <p className="text-gray-500 text-[12px]">{banner.content}</p>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default HomeConsultation;
