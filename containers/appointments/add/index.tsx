import React from "react";

// containers
import CompanyForm from "containers/appointments/add/CompanyForm";
import ClinicForm from "containers/appointments/add/ClinicForm";

// components
import SubContainer from "components/layouts/subContainer";

import { UserCookieType } from "types/cookies";

interface ComponentProps {
  user: UserCookieType;
}

const AddAppointmentContainer: React.FC<ComponentProps> = ({ user }) => {
  console.log({ user });

  return (
    <SubContainer title="Create Appointment">
      {user.userType === "clinic" ? <ClinicForm /> : <CompanyForm />}
    </SubContainer>
  );
};

export default AddAppointmentContainer;
