import React, { useEffect, useState } from "react";
import Link from "next/link";

// components
import SubContainer from "@/components/layouts/subContainer";
import Button from "@/components/uiElements/button";
import Table from "@/components/uiElements/table";

// context
import { useStateValue } from "@/context/StateProvider";

// constants
import { employeesColumns } from "@/constants/table/company/employees";

// services
import { getEmployees } from "@/services/employee";
import moment from "moment";

const EmployeesContainer = () => {
  const [servicesRow, setServicesRow] = useState([]);
  const { currentUser } = useStateValue();

  //   const [serviceModalOpen, setServiceModalOpen] = useState(false);

  const HeadingButtons = () => (
    <div className="flex justify-center items-center gap-[12px]">
      <Link href="/employees/add">
        <Button label="Add Employee" />
      </Link>
    </div>
  );

  useEffect(() => {
    currentUser?.company?._id &&
      (async () => {
        const { response, error } = await getEmployees(
          currentUser?.company?._id
        );

        if (response) {
          const rowData = response?.data?.map((employee: any, idx: number) => ({
            srNo: `${idx + 1}`,
            name: `${employee.firstName} ${employee.lastName}`,
            phone: employee?.phone,
            email: employee?.email,
            dob: moment(employee?.dob).format("DD-MMM-YYYY")
          }));
          setServicesRow(rowData);
        }

        if (error) {
          console.log({ error });
        }
      })();
  }, [currentUser]);

  return (
    <SubContainer
      showHeaderSiblings={true}
      headerSiblings={<HeadingButtons />}
      title="Employees"
    >
      <Table columnData={employeesColumns} rowData={servicesRow} />
    </SubContainer>
  );
};
export default EmployeesContainer;
