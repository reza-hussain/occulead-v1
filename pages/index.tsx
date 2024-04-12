"use client";
// import bannerImg from "public/assets/images/banner-img.png";
// import trustedBy from "@/assets/images/Trusted-By.png";
import Carousel from "components/uiElements/Home/HomeCarousel";
import HomeCard from "components/uiElements/Home/HomeCard";
import Search from "assets/components/Search";

import image1 from "@/assets/images/image1.png";
import image2 from "@/assets/images/image2.png";
import image3 from "@/assets/images/image3.png";
import HomeSpecialities from "components/uiElements/Home/HomeSpecialities";
import HomeConsultation from "components/uiElements/Home/HomeConsultation";
import HomeTestimonials from "components/uiElements/Home/HomeTestimonials";

const data = [
  {
    name: "Our services",
    image: image2
  },
  {
    name: "Occupational medicine",
    image: image1
  },
  {
    name: "Environmental",
    image: image3
  },
  {
    name: "Safety",
    image: image2
  },
  {
    name: "Security",
    image: image3
  }
];

export default function Home() {
  return (
    <div className="max-w-[1232px] m-auto w-full flex flex-col justify-start items-center gap-[120px] p-[16px] mt-[52px] bg-white text-black">
      <section className="w-full flex flex-col justify-start items-center gap-[20px] bg-white">
        <div className="w-full flex justify-start items-center">
          <label
            htmlFor="homeSearch"
            className="w-full basis-[40%] flex justify-start items-center gap-[12px] px-[12px] border border-gray-200 rounded-sm "
          >
            <Search className="w-[16px] h-[16px]" />
            <input
              id="homeSearch"
              type="text"
              className="no-outline bg-transparent w-full h-full py-[12px]"
              placeholder="Search doctors, clinics and hospitals"
            />
          </label>
        </div>
        <Carousel />
      </section>

      <div className="w-full flex justify-start items-stretch gap-[12px] overflow-auto no-scrollbar">
        {data.map((item) => (
          <HomeCard key={item.name} item={item} />
        ))}
      </div>
      <HomeSpecialities />
      <HomeConsultation />
      <HomeTestimonials />
    </div>
  );
}
