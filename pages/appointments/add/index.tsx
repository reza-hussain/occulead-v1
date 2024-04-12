import React from "react";
import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";

// containers
import AddAppointmentContainer from "@/containers/appointments/add";

// types
import { UserCookieType } from "@/types/cookies";

const Page = ({ user }: { user: UserCookieType }) => {
  return <AddAppointmentContainer user={user} />;
};

export default Page;

export const getServerSideProps = async ({
  req,
  res
}: GetServerSidePropsContext) => {
  const cookies = getCookie("user", { req, res });
  const user = JSON.parse(cookies as string);

  return {
    props: {
      user
    }
  };
};
