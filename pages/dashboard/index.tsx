import React from "react";
import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";

// containers
import ClinicDashboard from "containers/dashboard/clinic";
import CompanyDashboard from "containers/dashboard/company";
import { GET_ALL_APPOINTMENTS } from "services/apiUrl";
import { AppointmentDetailsType } from "types/containers/appointments/appointmentDetails";

type ServerProps = {
  user: {
    userType: string;
  };
  appointment: AppointmentDetailsType;
};

const Dashboard = ({ user, appointment }: ServerProps) => {
  return (
    <div className="w-full h-full dflex-start flex-col text-black p-[24px]">
      {user.userType === "clinic" ? (
        <ClinicDashboard tableData={appointment} />
      ) : (
        <CompanyDashboard />
      )}
    </div>
  );
};

export default Dashboard;

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
