import React from "react";
import AppointmentContainer from "@/containers/appointments";
import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";

// services
import { GET_ALL_APPOINTMENTS } from "@/services/apiUrl";

// types
import { UserCookieType } from "@/types/cookies";

interface PageProps {
  appointment: any;
  user: UserCookieType;
}

const Page: React.FC<PageProps> = ({ appointment, user }) => {
  return <AppointmentContainer data={appointment} user={user} />;
};

export default Page;

export const getServerSideProps = async ({
  req,
  res
}: GetServerSidePropsContext) => {
  const token = getCookie("token", { req, res });
  const usertoken = getCookie("user", { req, res });

  const response = await fetch(`${GET_ALL_APPOINTMENTS}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response?.json();

  const user = JSON.parse(usertoken as string);

  return {
    props: {
      appointment: data?.data,
      user: user
    }
  };
};
