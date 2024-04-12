import React, { useState } from "react";

// containers
import UserType from "@/containers/onboarding/formstep/UserType";
import ClinicDetails from "@/containers/onboarding/formstep/Clinics/ClinicDetails";

// types
import { OnboardingFormValues } from "types/containers/onboarding/formTypes";
import CompanyDetails from "./formstep/Company/CompanyDetails";

const initialFormValues: OnboardingFormValues = {
  userType: "clinic",
  logo: "",
  name: "",
  email: "",
  phone: "",
  website: "",
  primaryAddress: "",
  secondaryAddress: "",
  zipCode: "",
  fax: "",
  country: "",
  state: "",
  city: "",
  description: "",
  contactPerson: "",
  contactEmail: "",
  contactPhone: ""
};

const Onboarding = () => {
  const [formValues, setFormValues] =
    useState<OnboardingFormValues>(initialFormValues);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => setActiveStep(activeStep + 1);

  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-white py-[24px] mt-[52px] dflex-center">
      <div className="flex h-full w-full flex-col justify-center items-center md:max-w-[70%] m-auto">
        {activeStep === 0 ? (
          <UserType
            handleNext={handleNext}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        ) : (
          activeStep === 1 &&
          (formValues?.userType === "clinic" ? (
            <ClinicDetails
              formValues={formValues}
              setFormValues={setFormValues}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          ) : (
            <CompanyDetails
              formValues={formValues}
              setFormValues={setFormValues}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Onboarding;
