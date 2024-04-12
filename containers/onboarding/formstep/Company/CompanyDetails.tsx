"use client";

import React, { useMemo } from "react";
import { Country, City, State } from "country-state-city";
import { useRouter } from "next/router";

// components
import Input from "components/formElements/Input";
import Select from "@/components/formElements/Select";
import Button from "@/components/uiElements/button";
import ImageUpload from "@/components/formElements/ImageUpload";

// services
import { postCompany } from "@/services/company";

// types
import { OnboardingFormValues } from "@/types/containers/onboarding/formTypes";

interface ComponentProps {
  handleBack: () => void;
  handleNext: () => void;
  setFormValues: React.Dispatch<React.SetStateAction<OnboardingFormValues>>;
  formValues: OnboardingFormValues;
}

const CompanyDetails: React.FC<ComponentProps> = ({
  handleBack,
  setFormValues,
  formValues,
  handleNext
}) => {
  const router = useRouter();

  const isSubmitDisabled = !Object?.entries(formValues)?.every(([key, val]) => {
    if (
      key === "contactEmail" ||
      key === "contactPhone" ||
      key === "description"
    ) {
      return true;
    }
    if (typeof val === "object") {
      return Object.values(val)?.every((ele) => String(ele)?.length > 0);
    }

    return String(val)?.length > 0;
  });

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

  const handleFormChange = (
    value: string,
    key?: string,
    parentKey?: "responsibleDetails" | "billingDetails"
  ) => {
    if (parentKey) {
      const values = {
        ...formValues,
        [parentKey]: {
          ...formValues[parentKey],
          [key as string]: value
        }
      };

      setFormValues(values);
      return;
    }

    setFormValues({
      ...formValues,
      [key as string]: value
    });
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload = { ...formValues };

    try {
      const { response } = await postCompany(payload);

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
          {/* PROFILE DETAILS */}
          <h2 className="text-[18px] text-black font-[600]">Profile Details</h2>

          <div className="dflex-start w-full p-[10px] flex-wrap gap-[30px]">
            <div className="w-full flex flex-col justify-center items-center">
              <h3 className="pb-[12px] mr-auto">Clinic Logo</h3>
              <ImageUpload
                id="profilePic"
                setFile={(url) => handleFormChange(url, "logo")}
                file={formValues?.logo}
              />
            </div>
            <Input
              label="Company Name"
              placeholder="Enter Company Name"
              customStyles={{ flexBasis: "31%" }}
              id="name"
              type="text"
              value={formValues.name}
              onChangeValue={(e) => handleFormChange(e.target.value, "name")}
            />
            <Input
              label="Contact Person"
              placeholder="Enter Contact Person"
              customStyles={{ flexBasis: "31%" }}
              id="contactPerson"
              type="text"
              value={formValues.contactPerson ?? ""}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "contactPerson")
              }
            />
            <Input
              type="text"
              value={formValues.email}
              label="Email"
              placeholder="Enter Company Email"
              customStyles={{ flexBasis: "31%" }}
              id="email"
              onChangeValue={(e) => handleFormChange(e.target.value, "email")}
            />
            <Input
              value={formValues.phone}
              label="Phone"
              placeholder="Enter Company Phone"
              customStyles={{ flexBasis: "31%" }}
              id="phone"
              type="number"
              onChangeValue={(e) => handleFormChange(e.target.value, "phone")}
            />
            <Input
              type="text"
              value={formValues.website}
              label="Website"
              placeholder="Enter Company Website"
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
          </div>
        </div>
        {/* RESPONSIBLE PARTY */}
        <div className="w-full flex flex-col justify-start items-start bg-white gap-[12px]">
          <h2 className="text-[18px] text-black font-[600]">
            Responsible Party {"(For Payment)"}
          </h2>
          <div className="dflex-start w-full p-[10px] flex-wrap gap-[30px]">
            <Input
              type="text"
              value={formValues?.responsibleDetails?.title ?? ""}
              id="responsibleTitle"
              label="Title"
              placeholder="Enter Responsible Title"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "title", "responsibleDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.responsibleDetails?.name ?? ""}
              id="responsibleName"
              label="Name"
              placeholder="Enter Responsible Name"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "name", "responsibleDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.responsibleDetails?.email ?? ""}
              id="responsibleEmail"
              label="Email"
              placeholder="Enter Contact Email"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "email", "responsibleDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.responsibleDetails?.phone ?? ""}
              id="responsiblePhone"
              label="Phone"
              placeholder="Enter Responsible Phone"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "phone", "responsibleDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.responsibleDetails?.website}
              label="Website"
              placeholder="Enter Company Website"
              customStyles={{ flexBasis: "31%" }}
              id="responsibleWebsite"
              onChangeValue={(e) =>
                handleFormChange(
                  e.target.value,
                  "website",
                  "responsibleDetails"
                )
              }
            />
            <Input
              type="text"
              value={formValues?.responsibleDetails?.primaryAddress}
              label="Primary Address"
              placeholder="Enter Primary Address"
              customStyles={{ flexBasis: "31%" }}
              id="responsibleAddress1"
              onChangeValue={(e) =>
                handleFormChange(
                  e.target.value,
                  "primaryAddress",
                  "responsibleDetails"
                )
              }
            />
            <Input
              type="text"
              value={formValues?.responsibleDetails?.secondaryAddress}
              label="Secondary Address"
              placeholder="Enter Secondary Address"
              customStyles={{ flexBasis: "31%" }}
              id="responsibleAddress2"
              onChangeValue={(e) =>
                handleFormChange(
                  e.target.value,
                  "secondaryAddress",
                  "responsibleDetails"
                )
              }
            />
            <Input
              value={formValues?.responsibleDetails?.zipCode}
              label="Zip Code"
              placeholder="Enter Zip Code"
              customStyles={{ flexBasis: "31%" }}
              type="numeric"
              id="responsibleZipCode"
              onChangeValue={(e) =>
                handleFormChange(
                  e.target.value,
                  "zipCode",
                  "responsibleDetails"
                )
              }
            />
            <Input
              value={formValues?.responsibleDetails?.fax}
              label="Fax"
              placeholder="Enter Fax Number"
              customStyles={{ flexBasis: "31%" }}
              type="numeric"
              id="responsibleFax"
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "fax", "responsibleDetails")
              }
            />
            {countries && (
              <Select
                options={updatedCountries}
                label="Country"
                placeholder="Select Country"
                id="responsibleCountry"
                showSearch={true}
                style={{ flexBasis: "31%" }}
                value={formValues?.responsibleDetails?.country}
                onChange={(val) =>
                  handleFormChange(val, "country", "responsibleDetails")
                }
              />
            )}
            <Select
              options={
                updatedStates(formValues?.responsibleDetails?.country) ?? null
              }
              label="State"
              placeholder="Select State"
              id="responsibleState"
              showSearch={true}
              style={{ flexBasis: "31%" }}
              value={formValues?.responsibleDetails?.state}
              onChange={(val) =>
                handleFormChange(val, "state", "responsibleDetails")
              }
            />
            <Select
              options={
                updatedCities(
                  formValues?.responsibleDetails?.country,
                  formValues?.responsibleDetails?.state
                ) ?? null
              }
              label="City"
              placeholder="Select City"
              id="responsibleCity"
              showSearch={true}
              style={{ flexBasis: "31%" }}
              value={formValues?.responsibleDetails?.city}
              onChange={(val) =>
                handleFormChange(val, "city", "responsibleDetails")
              }
            />
          </div>
        </div>
        {/* BILLING DETAILS */}
        <div className="w-full flex flex-col justify-start items-start bg-white gap-[12px]">
          <h2 className="text-[18px] text-black font-[600]">Billing Details</h2>
          <div className="dflex-start w-full p-[10px] flex-wrap gap-[30px]">
            <Input
              type="text"
              value={formValues?.billingDetails?.title ?? ""}
              id="billingTitle"
              label="Title"
              placeholder="Enter Responsible Title"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "title", "billingDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.billingDetails?.name ?? ""}
              id="billingName"
              label="Name"
              placeholder="Enter Responsible Name"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "name", "billingDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.billingDetails?.email ?? ""}
              id="billingEmail"
              label="Email"
              placeholder="Enter Contact Email"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "email", "billingDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.billingDetails?.phone ?? ""}
              id="billingPhone"
              label="Phone"
              placeholder="Enter Responsible Phone"
              customStyles={{ flexBasis: "31%" }}
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "phone", "billingDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.billingDetails?.website}
              label="Website"
              placeholder="Enter Company Website"
              customStyles={{ flexBasis: "31%" }}
              id="billingWebsite"
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "website", "billingDetails")
              }
            />
            <Input
              type="text"
              value={formValues?.billingDetails?.primaryAddress}
              label="Primary Address"
              placeholder="Enter Primary Address"
              customStyles={{ flexBasis: "31%" }}
              id="billingAddress1"
              onChangeValue={(e) =>
                handleFormChange(
                  e.target.value,
                  "primaryAddress",
                  "billingDetails"
                )
              }
            />
            <Input
              type="text"
              value={formValues?.billingDetails?.secondaryAddress}
              label="Secondary Address"
              placeholder="Enter Secondary Address"
              customStyles={{ flexBasis: "31%" }}
              id="billingAddress2"
              onChangeValue={(e) =>
                handleFormChange(
                  e.target.value,
                  "secondaryAddress",
                  "billingDetails"
                )
              }
            />
            <Input
              value={formValues?.billingDetails?.zipCode}
              label="Zip Code"
              placeholder="Enter Zip Code"
              customStyles={{ flexBasis: "31%" }}
              type="numeric"
              id="billingZipCode"
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "zipCode", "billingDetails")
              }
            />
            <Input
              value={formValues?.billingDetails?.fax}
              label="Fax"
              placeholder="Enter Fax Number"
              customStyles={{ flexBasis: "31%" }}
              type="numeric"
              id="billingFax"
              onChangeValue={(e) =>
                handleFormChange(e.target.value, "fax", "billingDetails")
              }
            />
            {countries && (
              <Select
                options={updatedCountries}
                label="Country"
                placeholder="Select Country"
                id="billingCountry"
                showSearch={true}
                style={{ flexBasis: "31%" }}
                value={formValues?.billingDetails?.country}
                onChange={(val) =>
                  handleFormChange(val, "country", "billingDetails")
                }
              />
            )}
            <Select
              options={
                updatedStates(formValues?.billingDetails?.country) ?? null
              }
              label="State"
              placeholder="Select State"
              id="billingState"
              showSearch={true}
              style={{ flexBasis: "31%" }}
              value={formValues?.billingDetails?.state}
              onChange={(val) =>
                handleFormChange(val, "state", "billingDetails")
              }
            />
            <Select
              options={
                updatedCities(
                  formValues?.billingDetails?.country,
                  formValues?.billingDetails?.state
                ) ?? null
              }
              label="City"
              placeholder="Select City"
              id="billingCity"
              showSearch={true}
              style={{ flexBasis: "31%" }}
              value={formValues?.billingDetails?.city}
              onChange={(val) =>
                handleFormChange(val, "city", "billingDetails")
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

export default CompanyDetails;
