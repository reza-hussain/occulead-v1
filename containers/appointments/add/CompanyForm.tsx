import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// components
import Select from "components/formElements/Select";
import Input from "components/formElements/Input";
import { companyPaymentBy, visitorTypeDropdown } from "constants/dropdowns";
import DatePicker from "components/formElements/DatePicker";
import MultiSelect from "@/components/formElements/MultiSelect";
import Button from "@/components/uiElements/button";

// context
import { useStateValue } from "@/context/StateProvider";

// services
import { getApprovedClinics } from "@/services/company";
import { getEmployees } from "@/services/employee";
import { getClinicServices } from "@/services/clinic";
import { createAppointment } from "@/services/appointment";

// assets
import Trash from "assets/components/Trash";
import Plus from "assets/components/Plus";

// types
import {
  DefaultEmployeesType,
  CompanyFormValuesType,
  SelectServiceType,
  AppointmentPayload
} from "types/containers/appointments/appointmentForm";
import { OptionType } from "types/components/formElements/Select";

const defaultEmployees: DefaultEmployeesType = {
  id: "",
  visitorType: "",
  paymentBy: "",
  service: [
    {
      label: "",
      value: ""
    }
  ],
  total: "",
  date: null
};

const initialFormValues: CompanyFormValuesType = {
  serviceProvider: {
    id: "",
    name: ""
  },
  subTotal: 0,
  total: 0,
  tax: 0.18,
  employees: []
};

const CompanyForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const [employeesList, setEmployeesList] = useState<OptionType[]>([]);

  const [serviceProvider, setServiceProvider] = useState<OptionType[]>([]);
  const [allServices, setAllServices] = useState<SelectServiceType[]>();
  const [servicesOptions, setServicesOptions] = useState<OptionType[]>([
    {
      label: "",
      value: ""
    }
  ]);

  const { currentUser } = useStateValue();
  const [count, setCount] = useState(0);

  // USE-EFFECTS

  useEffect(() => {
    currentUser?.company &&
      (async () => {
        const { response, error } = await getApprovedClinics();
        if (response?.data) {
          const data = response?.data?.map((item: any) => ({
            label: item?.name,
            value: item?._id
          }));
          setServiceProvider(data);
        }
        if (error) {
          console.log({ error });
        }
      })();

    currentUser?.company &&
      (async () => {
        const { response, error } = await getEmployees();
        if (response?.data) {
          const data = response?.data?.map((item: any) => ({
            label: item.firstName,
            value: item._id
          }));
          setEmployeesList(data);
        }

        if (error) {
          console.log({ error });
        }
      })();
  }, [currentUser]);

  useEffect(() => {
    formValues.serviceProvider?.id?.length &&
      (async () => {
        const { response, error } = await getClinicServices(
          formValues?.serviceProvider?.id
        );

        if (response?.data) {
          const data = response?.data?.services?.map((item: any) => ({
            label: item.service,
            value: item?._id
          }));

          setServicesOptions(data?.length ? data : defaultEmployees?.service);
          setAllServices(response?.data?.services);
        }
        if (error) {
          console.log({ error });
        }
      })();
  }, [formValues.serviceProvider?.id?.length]);

  // DISABLED CONDITIONS FOR BUTTON
  const isAddButtonDisabled = !formValues?.employees?.every(
    (employee: DefaultEmployeesType) =>
      Object.entries(employee).every(
        ([key, value]: [string, string | OptionType[] | Date | null]) => {
          if (key === "service") {
            return (
              (value as SelectServiceType[])?.length &&
              (value as SelectServiceType[]).every((service) =>
                Object.values(service).every((item) => item?.length > 0)
              )
            );
          }
          if (key === "date") {
            return (value as Date)?.toISOString()?.length > 0;
          }
          return (value as string)?.length > 0;
        }
      )
  );

  // TOTAL AMOUNT CALCULATION
  const amount = useMemo(() => {
    const subTotal = formValues?.employees.reduce((acc, employee) => {
      const total = employee?.service?.reduce((total, curr) => {
        const service = allServices?.filter(
          (item) => item._id === curr.value
        )?.[0];
        return Number(service?.price) + total;
      }, 0);

      return total + acc;
    }, 0);

    const total = subTotal + subTotal * 0.18;

    setFormValues({ ...formValues, subTotal, total });
    return { subTotal, total };
  }, [formValues.employees, count, allServices]);

  const getEmployeeTotal = (index: number) => {
    const total = formValues?.employees?.[index]?.service?.reduce(
      (total, curr) => {
        const service = allServices?.filter(
          (item) => item._id === curr.value
        )?.[0];

        return total + Number(service?.price);
      },
      0
    );

    return total ? String(total) : null;
  };

  // CHANGE AND SUBMIT FUNCTIONS

  const handleFormChange = (
    value: string | SelectServiceType[] | DefaultEmployeesType | OptionType[],
    key?: string,
    parentKey?: "serviceProvider" | "services" | "employees",
    index?: number
  ) => {
    if (parentKey === "serviceProvider") {
      const data = serviceProvider?.filter((item) => item.value === value)?.[0];

      const values: CompanyFormValuesType = {
        ...initialFormValues,
        [parentKey]: {
          id: data.value,
          name: data.label
        }
      };

      setFormValues(values);
      return;
    }

    if (parentKey === "employees" && typeof index === "number" && index >= 0) {
      const data = employeesList?.filter((item) => item?.value === value)?.[0];

      if (key === "service") {
        const tempFormValues = { ...formValues };

        const total = (value as OptionType[]).reduce((acc, curr) => {
          const price = allServices?.filter(
            (item) => item?._id === curr.value
          )?.[0]?.price;

          return acc + Number(price);
        }, 0);

        const employee = tempFormValues?.[parentKey][index];

        tempFormValues?.[parentKey]?.splice(index, 1, {
          ...employee,
          service: value as OptionType[],
          total: String(total)
        });

        const values: CompanyFormValuesType = {
          ...tempFormValues,

          [parentKey]: tempFormValues[parentKey]
        };
        setCount(count + 1);
        setFormValues(values);
        return;
      }

      const values: CompanyFormValuesType = {
        ...formValues,
        [parentKey]: formValues.employees.splice(index, 1, {
          ...formValues.employees[index],
          [key as string]: key === "id" ? data.value : value
        })
      };

      setFormValues(values);
    }

    setFormValues({
      ...formValues,
      [key as string]: value
    });
  };

  const handleAddEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newEmployees = formValues.employees;
    newEmployees.push({ ...defaultEmployees, id: uuidv4() });
    setFormValues({ ...formValues, employees: newEmployees });
  };

  const handleDeleteEmployee = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const newEmployees = formValues?.employees?.filter(
      (employee) => employee.id !== id
    );

    setFormValues({ ...formValues, employees: newEmployees });
  };

  const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const payload: AppointmentPayload[] = [];
    formValues?.employees?.map((employee) => {
      employee?.service?.map((service) =>
        payload.push({
          date: employee?.date as Date,
          employee: employee?.id,
          company: currentUser?.company?._id,
          clinic: formValues?.serviceProvider?.id,
          services: service?.value,
          subTotal: employee?.total,
          total: String(
            Number(employee?.total) + Number(employee?.total) * 0.18
          ),
          paymentBy: employee?.paymentBy,
          visitorType: employee?.visitorType
        })
      );
    });

    const appointment = await createAppointment(payload);

    console.log({ appointment });
  };

  return (
    <form className="w-full flex flex-col justify-start items-center bg-white gap-[24px] p-[32px] rounded-md">
      {/* SELECT PROVIDER */}
      <div className="w-full flex flex-col justify-start items-start bg-white gap-[12px]">
        <h2 className="text-[18px] text-black font-[600]">Facility Details</h2>
        <div className="flex justify-start items-center w-full p-[10px] flex-wrap gap-[30px]">
          <Select
            options={serviceProvider}
            label="Service Provider"
            placeholder="Select Service Provider"
            id="serviceProvider"
            showSearch={true}
            className="basis-[30%]"
            onChange={(val) => handleFormChange(val, "id", "serviceProvider")}
            value={formValues?.serviceProvider.id}
          />
        </div>
      </div>

      {/* MAPPING THROUGH EMPLOYEES */}

      <div className="w-full flex flex-col justify-start bg-white gap-[12px]">
        <h2 className="text-[18px] text-black font-[600]">Employee Details</h2>
        {formValues?.employees?.map((item, index) => (
          <div
            key={uuidv4()}
            className={`flex justify-start items-stretch w-full p-[10px] flex-wrap gap-[30px] text-black ${
              index > 0 && "pt-[20px] shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.2)]"
            }`}
          >
            <Select
              options={employeesList}
              label="Employee"
              placeholder="Select Employee"
              id={`employeeName${index}`}
              showSearch={true}
              className="basis-[30%]"
              onChange={(val) =>
                handleFormChange(val, "id", "employees", index)
              }
              value={formValues?.employees[index]?.id}
            />

            <Select
              options={visitorTypeDropdown}
              label="Visitor Type"
              placeholder="Select Visitor Type"
              id={`employeesVisitorType${index}`}
              showSearch={true}
              className="basis-[30%]"
              onChange={(val) =>
                handleFormChange(val, "visitorType", "employees", index)
              }
              value={formValues?.employees[index]?.visitorType}
            />
            <Select
              options={companyPaymentBy}
              label="Payment By"
              placeholder="Select Payment By"
              id={`employeesPaymentBy${index}`}
              showSearch={true}
              className="basis-[30%]"
              onChange={(val) =>
                handleFormChange(val, "paymentBy", "employees", index)
              }
              value={formValues?.employees[index]?.paymentBy}
            />
            <DatePicker
              value={formValues?.employees[index]?.date}
              className="basis-[30%]"
              label="Preferred Date"
              onChange={(val) =>
                handleFormChange(val, "date", "employees", index)
              }
            />

            <MultiSelect
              value={formValues?.employees[index]?.service}
              options={servicesOptions}
              label="Select Services"
              placeholder="Select Services"
              id={`employeeService${index}`}
              className="basis-[30%]"
              isDisabled={!servicesOptions?.length}
              onChangeValue={(val: any) =>
                handleFormChange(val, "service", "employees", index)
              }
              isSelectAll={true}
            />
            <Input
              label="Total"
              placeholder="Total"
              className="basis-[30%]"
              id={`employeestotal${index}`}
              disabled
              value={getEmployeeTotal(index) as string}
            />

            {index > 0 && (
              <button
                onClick={(e) => handleDeleteEmployee(item.id, e)}
                className="mr-auto px-[16px] py-[8px] flex justify-between items-center gap-[12px] bg-white hover:bg-gray-100"
              >
                <p>Delete</p>
                <Trash width={12} height={12} />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={handleAddEmployee}
          disabled={isAddButtonDisabled}
          className="w-fit flex justify-start items-center text-blue-400 px-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none"
        >
          <Plus fill="rgb(96 165 250)" />
          <p>Add Employee</p>
        </button>
      </div>
      {/* TOTAL, SUB-TOTAL AND TAX */}
      <div className="flex justify-start items-center w-full p-[10px] flex-wrap gap-[30px] text-black">
        <Input
          label="Sub Total"
          placeholder="Sub Total"
          className="basis-[30%]"
          id="subTotal"
          disabled
          value={
            (amount?.subTotal ? String(amount?.subTotal) : undefined) as string
          }
        />
        <Input
          label="Tax"
          placeholder="Tax"
          className="basis-[30%]"
          id="tax"
          disabled
          value={"18%"}
        />
        <Input
          label="Total"
          placeholder="Total Amount"
          className="basis-[30%]"
          id="total"
          disabled
          value={(amount?.total ? String(amount?.total) : undefined) as string}
        />
      </div>

      {/* SUBMIT BUTTONS */}
      <div className="w-[90%] flex justify-end items-stretch py-[22px] gap-[20px]">
        <Button label="Cancel" />

        <Button onClick={onFormSubmit} label="Request appointment" />
      </div>
    </form>
  );
};

export default CompanyForm;
