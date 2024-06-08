import React, { useEffect, useState } from "react";

// components
import SubContainer from "components/layouts/subContainer";
import Table from "components/uiElements/table";
import Status from "components/uiElements/table/status";

// constants
import { appointmentColumns } from "constants/table/appointments";

// types
import { UserCookieType } from "types/cookies";
import ArrowDown from "assets/components/ArrowDown";
import { useRouter } from "next/navigation";
import Button from "components/uiElements/button";

interface ComponentProps {
  data: any;
  user: UserCookieType;
}

const companyColumns = [
  {
    title: "Clinic",
    column: "clinic"
  }
];

const clinicColumns = [
  {
    title: "Company",
    column: "company"
  }
];

const AppointmentContainer: React.FC<ComponentProps> = ({ data, user }) => {
  const [appointmentRow, setAppointmentRow] = useState([]);

  const router = useRouter();

  const isCompany = user?.userType === "company";

  useEffect(() => {
    const rowData = data?.map((item: any, index: number) => ({
      srNo: `${index + 1}`,
      clinic: item.clinic.name,
      company: item.company.name,
      employee: `${item.employee.firstName} ${item.employee.lastName}`,
      employeeID: item.employee.employeeID,
      date: new Date(item?.date).toDateString(),
      status: () => (
        <Status
          status={item.status}
          options={["Pay Now", "Scheduled", "Completed"]}
        />
      ),
      amount: item?.total,
      action: () => (
        <ArrowDown
          fill="#101010"
          style={{ rotate: "-90deg", cursor: "pointer" }}
          onClick={() => router.push(`appointments/${item._id}`)}
        />
      )
    }));

    setAppointmentRow(rowData);
  }, [data]);

  const columnData = [...appointmentColumns];
  isCompany
    ? columnData?.splice(1, 0, ...companyColumns)
    : columnData?.splice(1, 0, ...clinicColumns);

  const HeadingButtons = () => (
    <div className="flex justify-center items-center gap-[12px]">
      <Button
        className="bg-[#11a1fd] p-[10px] text-[14px] rounded-md"
        onClick={() => router.push("/appointments/add")}
        label="New Appointment"
      />
    </div>
  );

  return (
    <SubContainer
      title="Appointments"
      showHeaderSiblings={isCompany}
      headerSiblings={<HeadingButtons />}
    >
      <Table rowData={appointmentRow} columnData={columnData} />
    </SubContainer>
  );
};

export default AppointmentContainer;
