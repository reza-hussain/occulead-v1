import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 5000);
  });

  return (
    <div className="w-full flex justify-center items-center h-screen bg-white text-black">
      <h3>Payment Successful</h3>
      <p>Redirecting you to dashboard</p>
    </div>
  );
};

export default Success;
