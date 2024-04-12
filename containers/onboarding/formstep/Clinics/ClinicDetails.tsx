"use client";

import React, { useMemo, useState } from "react";

import Input from "components/formElements/Input";
import ImageUpload from "components/formElements/ImageUpload";
import MultiImageUpload from "@/components/formElements/MultiImageUpload";
// import Dropdown from "components/formElements/Dropdown";

import { Country, City, State } from "country-state-city";
import Select from "@/components/formElements/Select";
import { OnboardingFormValues } from "types/containers/onboarding/formTypes";
import TextArea from "@/components/formElements/TextArea";
import Button from "@/components/uiElements/button";
import { postClinic } from "@/services/clinic";
import { useRouter } from "next/router";
import { useStateValue } from "@/context/StateProvider";

interface ComponentProps {
  handleBack: () => void;
  handleNext: () => void;
  setFormValues: React.Dispatch<React.SetStateAction<OnboardingFormValues>>;
  formValues: OnboardingFormValues;
}

const ClinicDetails: React.FC<ComponentProps> = ({
  handleBack,
  setFormValues,
  formValues,
  handleNext
}) => {
  const [files, setFiles] = useState<string[]>([]);

  const router = useRouter();

  const { currentUser } = useStateValue();

  const isSubmitDisabled = !Object?.values(formValues)?.every(
    (item) => item?.length > 0
  );

  const countries = useMemo(() => Country.getAllCountries(), []);
  const updatedCountries = countries?.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country
  }));

  const updatedStates = (countryId: string) => {
    return State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.isoCode,
      iso: state.isoCode
    }));
  };

  const updatedCities = (countryId: string, stateId: string) => {
    return City.getCitiesOfState(countryId, stateId).map((city) => ({
      label: city.name,
      value: city.name
    }));
  };

  const handleFormChange = (value: string, key?: string) => {
    setFormValues({
      ...formValues,
      [key as string]: value
    });
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const contact = {
      name: formValues.contactPerson,
      email: formValues.contactEmail,
      phone: formValues.contactPhone
    };

    delete formValues.contactEmail;
    delete formValues.contactPerson;
    delete formValues.contactPhone;

    const payload = { ...formValues, contact, user: currentUser?._id };

    try {
      const { response } = await postClinic(payload);

      console.log({ response });

      if (response?.success) {
        handleNext();
        router.push("/onboarding/subscription");
      }
    } catch (err) {
      console.log({ err });
      return err;
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-start text-black gap-[16px]">
      <form className="w-full flex flex-col justify-start items-center bg-white gap-[24px] p-[18px] text-black">
        <div className="w-full flex flex-col justify-start items-start bg-white gap-[12px]">
          <h2 className="text-[18px] text-black font-[600]">Clinic Details</h2>

          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="pb-[12px] mr-auto">Clinic Logo</h3>
            <ImageUpload
              id="profilePic"
              setFile={(url) => handleFormChange(url, "logo")}
              file={formValues?.logo}
            />
          </div>

          <div className="dflex-start w-full p-[10px] flex-wrap gap-[30px]">
            <Input
              label="Clinic Name"
              placeholder="Enter Clinic Name"
              customStyles={{ flexBasis: "31%" }}
              id="name"
              type="text"
              value={formValues.name}
              onChangeValue={(e) => handleFormChange(e.target.value, "name")}
            />
            <Input
              type="text"
              value={formValues.email}
              label="Clinic Email"
              placeholder="Enter Clinic Email"
              customStyles={{ flexBasis: "31%" }}
              id="email"
              onChangeValue={(e) => handleFormChange(e.target.value, "email")}
            />
            <Input
              value={formValues.phone}
              label="Clinic Phone"
              placeholder="Enter Clinic Phone"
              customStyles={{ flexBasis: "31%" }}
              id="phone"
              type="number"
              onChangeValue={(e) => handleFormChange(e.target.value, "phone")}
            />
            <Input
              type="text"
              value={formValues.website}
              label="Clinic Website"
              placeholder="Enter Clinic Website"
              customStyles={{ flexBasis: "31%" }}
              id="website"
              onChangeValue={(e) => handleFormChange(e.target.value, "website")}
            />
            <Input
              type="text"
              value={formValues.primaryAddress}
              label="Primary Address"
              placeholder="Enter Primary Address"
              customStyles={{ flexBasis: "31%" }}
              id="primaryAddress"
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "primaryAddress")
              }
            />
            <Input
              type="text"
              value={formValues.secondaryAddress}
              label="Secondary Address"
              placeholder="Enter Secondary Address"
              customStyles={{ flexBasis: "31%" }}
              id="secondaryAddress"
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "secondaryAddress")
              }
            />
            <Input
              value={formValues.zipCode}
              label="Zip Code"
              placeholder="Enter Zip Code"
              customStyles={{ flexBasis: "31%" }}
              type="numeric"
              id="zipCode"
              onChangeValue={(e) => handleFormChange(e.target.value, "zipCode")}
            />
            <Input
              value={formValues.fax}
              label="Fax"
              placeholder="Enter Fax Number"
              customStyles={{ flexBasis: "31%" }}
              type="numeric"
              id="fax"
              onChangeValue={(e) => handleFormChange(e.target.value, "fax")}
            />
            {countries && (
              <Select
                options={updatedCountries}
                label="Country"
                placeholder="Select Country"
                id="country"
                showSearch={true}
                style={{ flexBasis: "31%" }}
                value={formValues.country}
                onChange={(val) => handleFormChange(val, "country")}
              />
            )}
            <Select
              options={updatedStates(formValues.country) ?? null}
              label="State"
              placeholder="Select State"
              id="state"
              showSearch={true}
              style={{ flexBasis: "31%" }}
              value={formValues.state}
              onChange={(val) => handleFormChange(val, "state")}
            />
            <Select
              options={
                updatedCities(formValues.country, formValues.state) ?? null
              }
              label="City"
              placeholder="Select City"
              id="city"
              showSearch={true}
              style={{ flexBasis: "31%" }}
              value={formValues.city}
              onChange={(val) => handleFormChange(val, "city")}
            />

            <TextArea
              id="description"
              value={formValues.description}
              onChange={(e) =>
                handleFormChange(e?.target?.value, "description")
              }
            />
            <div className="flex flex-col items-center justify-center basis-[100%]">
              <h3 className="w-full text-sm text-gray-400 pb-1 whitespace-nowrap">
                Clinic Images
              </h3>
              <MultiImageUpload
                files={files}
                id="documents"
                setFiles={setFiles}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start bg-white gap-[12px]">
          <h2 className="text-[18px] text-black font-[600]">Contact Details</h2>
          <div className="dflex-start w-full p-[10px] flex-wrap gap-[30px]">
            <Input
              type="text"
              value={formValues.contactPerson ?? ""}
              id="contactPerson"
              label="Contact Person Name"
              placeholder="Enter Contact Name"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "contactPerson")
              }
            />
            <Input
              type="text"
              value={formValues.contactEmail ?? ""}
              id="contactEmail"
              label="Contact Person Email"
              placeholder="Enter Contact Email"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "contactEmail")
              }
            />
            <Input
              type="text"
              value={formValues.contactPhone ?? ""}
              id="contactPhone"
              label="Contact Person Phone"
              placeholder="Enter Contact Phone"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "contactPhone")
              }
            />
          </div>
        </div>
        <div className="w-full dflex-between items-center text-black pt-[20px]">
          <Button label="Prev" id="onboarding-prev" onClick={handleBack} />

          <Button
            id="onboarding-next"
            onClick={handleFormSubmit}
            label="Next"
            disabled={isSubmitDisabled}
          />
        </div>
      </form>
    </div>
  );
};

export default ClinicDetails;
