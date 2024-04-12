import React from "react";
import Image from "next/image";

import logo from "@/assets/images/logo.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className=" w-full h-[64px] fixed top-0 dflex-between items-center bg-white p-[16px] text-[#1d2b4e] text-[14px] shadow shadow-slate-300 z-50">
      <Image
        src={logo}
        width={120}
        height={80}
        className="w-[120px] h-[20px] object-contain"
        alt="occulead_logo.png"
      />

      <ul className="flex flex-grow justify-center items-center gap-[36px] text-[#1d2b4e] list-none">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">Clinics</li>
        <li className="cursor-pointer">Companies</li>
      </ul>

      <div className="dflex-center gap-[16px]">
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Header;
