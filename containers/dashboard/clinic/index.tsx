import ArrowDown from "assets/components/ArrowDown";
import Card from "components/uiElements/dashboard/InsightCard";
import Table from "components/uiElements/table";
import Status from "components/uiElements/table/status";
import { appointmentColumns } from "constants/table/appointments";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface ComponentProps {
  tableData: any;
}

const ClinicDashboard: React.FC<ComponentProps> = ({ tableData }) => {
  const [appointmentData, setAppointmentData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const rowData = tableData?.map((item: any, index: number) => ({
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

    setAppointmentData(rowData);
  }, [tableData]);

  return (
    <div className="w-full dflex-start !items-start flex-col gap-8">
      <div className="w-full dflex-start gap-7">
        <Card title="Employees" value="138" />
        <Card title="Clinics" value="28" />
        <Card title="Pending Payments" value="$13,800" />
        <Card title="Paid Amount" value="$3,430" />
      </div>
      <Table columnData={appointmentColumns} rowData={appointmentData} />
    </div>
  );
};

export default ClinicDashboard;
