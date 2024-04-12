import AppointmentDetails from "containers/appointments/appointmentDetails";
import { GET_APPOINTMENT } from "services/apiUrl";
import { getSSRHeaders } from "utils/applicationHelper";
import { GetServerSidePropsContext } from "next";
import React from "react";

interface PageProps {
  appointment: any;
}

const Page: React.FC<PageProps> = ({ appointment }) => {
  return <AppointmentDetails appointment={appointment} />;
};

export default Page;

export const getServerSideProps = async ({
  req,
  res,
  params
}: GetServerSidePropsContext) => {
  const id = params?.id;

  const headers = getSSRHeaders(req, res);

  const response = await fetch(`${GET_APPOINTMENT}/${id}`, {
    headers: headers
  });

  const data = await response?.json();

  console.log({ data });

  return {
    props: {
      appointment: data?.data
    }
  };
};
