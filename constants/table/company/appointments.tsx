import { TableColumnType } from "types/components/uiElements/Table";

export const appointmentsTable = [
  {
    srNo: 0,
    clinic: "Apollo Pharmacy",
    employee: "Harsh",
    appointmentDetails: "2022-09-12",
    status: "approved",
    menu: true
  },
  {
    srNo: 1,
    clinic: "Apollo Pharmacy",
    employee: "Harsh",
    appointmentDetails: "2022-09-08",
    status: "approved",
    menu: true
  },
  {
    srNo: 2,
    clinic: "Apollo Pharmacy",
    employee: "Harsh",
    appointmentDetails: "2022-09-12",
    status: "approved",
    menu: true
  },
  {
    srNo: 3,
    clinic: "Apollo Pharmacy",
    employee: "Harsh",
    appointmentDetails: "2022-09-08",
    status: "pending",
    menu: true
  }
];

export const appointmentsColumns: TableColumnType[] = [
  {
    column: "srNo",
    title: "Sr. No"
  },

  {
    column: "employee",
    title: "Employee"
  },
  {
    column: "employeeID",
    title: "Employee ID"
  },
  {
    column: "date",
    title: "Appointment Date & Time"
  },
  {
    column: "status",
    title: "Status"
  },
  {
    column: "menu",
    title: "",
    cellStyles: {
      width: "2%",
      right: 0,
      top: 0
    }
  }
];
