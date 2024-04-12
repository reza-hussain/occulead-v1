import React from "react";

// containers
import EmployeeForm from "containers/employees/add/EmployeeForm";

// components
import SubContainer from "components/layouts/subContainer";

const AddEmployeeContainer = () => {
  return (
    <SubContainer title="Add Employee">
      <EmployeeForm />
    </SubContainer>
  );
};

export default AddEmployeeContainer;
