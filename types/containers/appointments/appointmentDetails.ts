export type AppointmentDetailsType = {
  _id: string;
  status: number;
  date: string;
  total: string;
  company: CompanyOrClinic;
  clinic: CompanyOrClinic;
  employee: Employee;
  services: Services;
  relatedAppointments: AppointmentDetailsType[];
  invoiceID: string;
};

type CompanyOrClinic = {
  _id: string;
  name: string;
};
type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  employeeID: string;
};

export interface Services {
  _id: string;
  code: string;
  service: string;
  price: string;
}
