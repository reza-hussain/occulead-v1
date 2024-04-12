import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { City, Country, State } from "country-state-city";

// components
import Select from "components/formElements/Select";
import Input from "components/formElements/Input";
import DatePicker from "components/formElements/DatePicker";

// services
import { postEmployee } from "services/employee";
import Button from "components/uiElements/button";
import ImageUpload from "components/formElements/ImageUpload";

const initialFormValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  profile: "",
  employeeID: "",
  email: "",
  phone: "",
  SSN: "",
  dob: null,
  primaryAddress: "",
  secondaryAddress: "",
  zipCode: "",
  fax: "",
  country: "",
  state: "",
  city: ""
};

const EmployeeForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const router = useRouter();

  const countries = useMemo(() => Country.getAllCountries(), []);

  const updatedCountries = countries.map((country: any) => ({
    label: country?.name,
    value: country?.isoCode,
    ...country
  }));

  const handleFormChange = (value: string, key?: string) => {
    console.log({ value, key });

    setFormValues({ ...formValues, [key as string]: value });
  };

  const updatedStates = (countryId: string) => {
    return State.getStatesOfCountry(countryId).map((state: any) => ({
      label: state?.name,
      value: state?.isoCode,
      iso: state?.isoCode
    }));
  };

  const updatedCities = (countryId: string, stateId: string) => {
    return City.getCitiesOfState(countryId, stateId).map((city: any) => ({
      label: city?.name,
      value: city?.name
    }));
  };

  const onFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await postEmployee(formValues);

    response && router.push("../employees");
  };
  return (
    <form className="w-full flex flex-col justify-start items-center bg-white gap-[24px] p-[32px] rounded-md">
      <div className="w-full flex flex-col justify-start items-start bg-white gap-[12px]">
        <h2 className="text-[18px] text-black font-[600]">Employee Details</h2>
        <ImageUpload
          id="employeeProfile"
          file={formValues?.profile}
          setFile={(url) => setFormValues({ ...formValues, profile: url })}
        />
        <div className="flex justify-start items-center w-full p-[10px] flex-wrap gap-[30px]">
          <Input
            label="First Name"
            placeholder="First Name"
            className="basis-[30%]"
            id="firstName"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "firstName")
            }
            value={formValues?.firstName}
          />

          <Input
            label="Middle Name"
            placeholder="Middle Name"
            className="basis-[30%]"
            id="middleName"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "middleName")
            }
            value={formValues?.middleName}
          />

          <Input
            label="Last Name"
            placeholder="Last Name"
            className="basis-[30%]"
            id="lastName"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "lastName")
            }
            value={formValues?.lastName}
          />
          <Input
            label="Employee ID"
            placeholder="Employee ID"
            className="basis-[30%]"
            id="employeeID"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "employeeID")
            }
            value={formValues?.employeeID}
          />

          <Input
            label="SSN"
            placeholder="SSN"
            className="basis-[30%]"
            id="SSN"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "SSN")
            }
            value={formValues?.SSN}
          />

          <DatePicker
            value={formValues?.dob}
            label="Date of Birth"
            className="basis-[30%] text-gray-400"
            onChange={(date: Date) =>
              handleFormChange(date.toISOString(), "dob")
            }
          />
          <Input
            label="Email ID"
            placeholder="Email ID"
            className="basis-[30%]"
            id="email"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "email")
            }
            value={formValues?.email}
          />
          <Input
            label="Phone"
            placeholder="Phone"
            className="basis-[30%]"
            id="phone"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "phone")
            }
            value={formValues?.phone}
          />
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start bg-white gap-[12px]">
        <h2 className="text-[18px] text-black font-[600]">Address</h2>
        <div className="flex justify-start items-center w-full p-[10px] flex-wrap gap-[30px] text-black">
          <Input
            label="Address 1"
            placeholder="Address 1"
            className="basis-[30%]"
            id="primaryAddress"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "primaryAddress")
            }
            value={formValues?.primaryAddress}
          />

          <Input
            label="Address 2"
            placeholder="Address 2"
            className="basis-[30%]"
            id="secondaryAddress"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "secondaryAddress")
            }
            value={formValues?.secondaryAddress}
          />

          <Input
            label="Zip Code"
            placeholder="Zip Code"
            className="basis-[30%]"
            id="zipCode"
            onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e.target.value, "zipCode")
            }
            value={formValues?.zipCode}
          />
          {countries && (
            <Select
              options={updatedCountries}
              label="Country"
              placeholder="Select Country"
              id="country"
              showSearch={true}
              className="basis-[30%]"
              value={formValues?.country}
              onChange={(val) => handleFormChange(val, "country")}
            />
          )}
          <Select
            options={updatedStates(formValues?.country) ?? null}
            label="State"
            placeholder="Select State"
            id="state"
            showSearch={true}
            className="basis-[30%]"
            disabled={!formValues?.country?.length}
            value={formValues?.state}
            onChange={(val) => handleFormChange(val, "state")}
          />
          <Select
            options={
              updatedCities(formValues?.country, formValues?.state) ?? null
            }
            label="City"
            placeholder="Select City"
            id="city"
            showSearch={true}
            className="basis-[30%]"
            disabled={!formValues?.state?.length}
            value={formValues?.city}
            onChange={(val) => handleFormChange(val, "city")}
          />
        </div>
      </div>
      <div className="w-[90%] flex justify-end items-center py-[22px] gap-[20px]">
        <Button
          label="Cancel"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.preventDefault()
          }
        />

        <Button label="Submit" onClick={onFormSubmit} />
      </div>
    </form>
  );
};

export default EmployeeForm;
