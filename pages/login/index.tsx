"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// components
import Loader from "@/components/uiElements/loader";

// context
import { useStateValue } from "@/context/StateProvider";

// services
import { loginUser } from "@/services/auth";

// utils
import { saveCookie } from "@/utils/storageHelper";

// assets
import { Google, AppleLogo, EmailIcon, Lock } from "@/assets/icons/index";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setCurrentUser } = useStateValue();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const payload = { email, password };

    const { response, error: errorData } = await loginUser(payload);

    if (errorData) {
      setError(errorData?.message);
    }

    if (response?.data) {
      saveCookie("user", JSON.stringify(response?.data?.user));
      saveCookie("token", response?.data?.token);
      saveCookie("expiryTime", response?.data?.expiryTime);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      localStorage.setItem(
        "expiryTime",
        JSON.stringify(response?.data?.expiryTime)
      );
      setCurrentUser(response?.data?.user ?? {});

      router.push("/dashboard");
    }

    setLoading(false);

    return;
  };

  return (
    <div className="w-full min-h-[calc(100vh-52px)] mt-[52px] p-[24px] dflex-center bg-white text-black overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center gap-[12px]"
      >
        <h2 className="text-[24px] font-[700]">Log in to your account</h2>
        <p>Welcome back! Select method to login</p>

        <div className="w-full dflex-between items-center px-[10px] py-[24px] gap-[12px] ">
          <button className="w-full dflex-start gap-[12px] px-[20px] py-[8px] border border-gray-200 text-black text-[14px] rounded-md">
            <Image src={Google} alt="google-icon" width={20} height={20} />
            <p>Google</p>
          </button>

          <button className="w-full dflex-start gap-[12px] px-[20px] py-[8px] border border-gray-200 text-black text-[14px] rounded-md">
            <Image src={AppleLogo} alt="google-icon" width={20} height={20} />
            <p>Apple</p>
          </button>
        </div>
        <span
          className="w-full flex items-center justify-center relative before:content-[''] before:h-[1px] before:w-[15%] before:bg-gray-300 before:absolute before:top-[52%] before:left-0
        after:content-[''] after:h-[1px] after:w-[15%] after:bg-gray-300 after:absolute after:top-[52%] after:right-0"
        >
          or continue with email
        </span>

        <div className="relative w-full flex flex-col justify-start items-center gap-[24px] py-[24px]">
          <div className="w-full relative dflex-start gap-[12px] bg-gray-100 py-[8px] px-[12px] rounded-sm">
            <Image src={EmailIcon} alt="apple-icon" width={18} height={18} />
            <input
              type="text"
              placeholder="Email"
              className="flex-grow bg-transparent outline-none focus:border-none"
              name="email"
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setEmail(e?.currentTarget?.value)
              }
            />
          </div>

          <div className="relative w-full dflex-start gap-[12px] bg-gray-100 py-[8px] px-[12px] rounded-sm">
            <Image src={Lock} alt="apple-icon" width={18} height={18} />
            <input
              type="password"
              placeholder="Password"
              className="flex-grow bg-transparent outline-none focus:border-none"
              name="password"
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setPassword(e?.currentTarget?.value)
              }
            />
          </div>

          <p className="errorMessage absolute bottom-0 text-center">{error}</p>
        </div>

        <button
          disabled={!email?.length && !password?.length}
          className="w-full dflex-center bg-blue-600 text-white py-[8px] px-[12px] rounded-md disabled:opacity-50 disabled:cursor-default"
        >
          {loading ? <Loader width={30} height={20} /> : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
