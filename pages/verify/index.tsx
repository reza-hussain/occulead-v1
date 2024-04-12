import { VERIFY_EMAIL } from "@/services/apiUrl";
import { GetServerSidePropsContext } from "next";
import React from "react";

const Verify = (props: any) => {
  return <div>Verify</div>;
};

export default Verify;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.query.token;

  console.log({ token });

  const response = await fetch(`${VERIFY_EMAIL}/${token}`);
  const data = await response?.json();

  if (data.status === 200) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/404"
    }
  };
};
