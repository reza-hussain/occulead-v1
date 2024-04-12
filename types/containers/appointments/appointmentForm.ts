import { OptionType } from "@/types/components/formElements/Select";

export type DefaultEmployeesType = {
  id: string;
  visitorType: string;
  paymentBy: string;
  service: OptionType[];
  total: string;
  date: Date | null;
};

export type CompanyFormValuesType = {
  serviceProvider: SelectServiceProviderType;
  subTotal: number;
  total: number;
  tax: number;
  employees: DefaultEmployeesType[];
};

export type ClinicFormValuesType = {
  company: SelectCompanyType;
  subTotal: number;
  total: number;
  tax: number;
  employees: DefaultEmployeesType[];
};

export type SelectCompanyType = {
  id: string;
  name: string;
};

export type SelectServiceProviderType = {
  id: string;
  name: string;
};
export type SelectServiceType = {
  service: string;
  price: string;
  code: string;
  speciality: string;
  _id: string;
  label?: string;
  value?: string;
};

export type AppointmentPayload = {
  date: Date;
  subTotal: string;
  total: string;
  // invoiceID: string
  // slot: string
  company: string;
  clinic: string;
  employee: string;
  visitorType: string;
  paymentBy: string;
  services: string;
};
