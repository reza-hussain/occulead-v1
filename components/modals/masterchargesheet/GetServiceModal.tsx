import React, { FormEvent, useEffect, useState } from "react";

// components
import FormModal from "components/modals/formModal";
import Select from "components/formElements/Select";

// services
import {
  getAllSpecialities,
  getServicesFromSpeciality
} from "services/services";
import { addServiceToClinic } from "services/clinic";

// utils
import { createDropdownOptions } from "utils/applicationHelper";

// types
import { OptionType } from "types/components/formElements/Select";

interface ComponentProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialFormValues = {
  speciality: "",
  service: ""
};

const GetServiceModal: React.FC<ComponentProps> = ({ isOpen, setIsOpen }) => {
  const [specialities, setSpecialities] = useState<OptionType[]>([]);
  const [services, setServices] = useState<OptionType[]>([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    (async () => {
      const { response, error } = await getAllSpecialities();

      if (response) {
        const data = response?.data.map((item: any) => item.speciality);

        setSpecialities(createDropdownOptions(data));
      }

      if (error) {
        console.log({ error });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { response, error } = await getServicesFromSpeciality(
        formValues?.speciality
      );

      if (response) {
        setServices(createDropdownOptions(response?.data, "service", "_id"));
      }

      if (error) {
        console.log({ error });
      }
    })();
  }, [formValues.speciality]);

  const handleFormChange = (value: string, key?: string) => {
    setFormValues({
      ...formValues,
      [key as string]: value
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { response, error } = await addServiceToClinic(formValues?.service);

    if (response) {
      setIsOpen(false);
    }

    if (error) {
      console.log({ error });
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={handleFormSubmit}
      title="Add Master Charge"
      id="addMasterCharge"
    >
      <>
        <Select
          options={specialities}
          placeholder="Select Speciality"
          label="Speciality"
          id="speciality"
          value={formValues.speciality}
          onChange={(e) => handleFormChange(e, "speciality")}
        />
        <Select
          options={services}
          placeholder="Select Service"
          label="Service"
          id="service"
          showSearch={true}
          value={formValues.service}
          disabled={!formValues.speciality.length}
          onChange={(e) => handleFormChange(e, "service")}
        />
      </>
    </FormModal>
  );
};

export default GetServiceModal;
