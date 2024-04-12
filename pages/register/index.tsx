import { FormEvent, SyntheticEvent, useState } from "react";
import Image from "next/image";

import { Google, AppleLogo, EmailIcon, Lock } from "@/assets/icons/index";
import { registerUser } from "@/services/auth";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [onSuccess, setOnSuccess] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e?.preventDefault();

    setLoading(true);

    const payload = {
      email,
      password
    };

    const { response, error } = await registerUser(payload);

    if (response?.data) {
      setOnSuccess(true);
    }
    if (error) {
      setOnSuccess(false);
      setError(error?.error?.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-52px)] mt-[52px] dflex-center bg-white text-black">
      {!onSuccess ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start items-center gap-[12px]"
        >
          <h2 className="text-[24px] font-[700]">Create a new account</h2>
          <p>Select a method to sign up</p>

          <div className="w-full dflex-between items-center px-[10px] py-[24px] gap-[12px] ">
            <button
              // onClick={() => signIn(providers?.google.id)}
              className="w-full dflex-start gap-[12px] px-[20px] py-[8px] border border-gray-200 text-black text-[14px] rounded-md"
            >
              <Image src={Google} alt="google-icon" width={20} height={20} />
              <p>Google</p>
            </button>

            <button
              // onClick={() => signIn(providers?.apple.id)}
              className="w-full dflex-start gap-[12px] px-[20px] py-[8px] border border-gray-200 text-black text-[14px] rounded-md"
            >
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
          <div className="w-full flex flex-col justify-start items-center gap-[16px] py-[24px] pb-[34px] relative">
            <div className="w-full dflex-start gap-[12px] bg-gray-100 py-[8px] px-[12px] rounded-sm">
              <Image src={EmailIcon} alt="apple-icon" width={18} height={18} />
              <input
                type="text"
                placeholder="Email"
                className="flex-grow bg-transparent outline-none focus:border-none"
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setEmail(e?.currentTarget?.value)
                }
              />
            </div>

            <div className="w-full dflex-start gap-[12px] bg-gray-100 py-[8px] px-[12px] rounded-sm">
              <Image src={Lock} alt="apple-icon" width={18} height={18} />
              <input
                type="password"
                placeholder="Password"
                className="flex-grow bg-transparent outline-none focus:border-none"
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setPassword(e?.currentTarget?.value)
                }
              />
            </div>

            <p className="errorMessage absolute bottom-0 text-center">
              {error}
            </p>
          </div>

          <button className="w-full dflex-center bg-blue-600 text-white py-[8px] px-[12px] rounded-md">
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center gap[-12px]">
          <h2 className="text-[24px] font-[700]">Thank you for registering!</h2>
          <p className="text-[16px] font-[500] text-gray-300">
            We have sent an email verification link to your account
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
