import { TableColumnType } from "@/types/components/uiElements/Table";

export const appointmentData = [
  {
    id: 1,
    description: "Heart surgery",
    appointmentDate: "16 June 2023",
    remarks: "test remarks",
    requestedService: "10009",
    status: "Completed"
  },
  {
    id: 2,
    description: "Heart surgery",
    appointmentDate: "16 June 2023",
    remarks: "test remarks",
    requestedService: "10009",
    status: "Pending"
  },
  {
    id: 3,
    description: "Heart surgery",
    appointmentDate: "16 June 2023",
    remarks: "test remarks",
    requestedService: "10009",
    status: "Completed"
  },
  {
    id: 4,
    description: "Heart surgery",
    appointmentDate: "16 June 2023",
    remarks: "test remarks",
    requestedService: "10009",
    status: "Completed"
  },
  {
    id: 5,
    description: "Heart surgery",
    appointmentDate: "16 June 2023",
    remarks: "test remarks",
    requestedService: "10009",
    status: "Pending"
  }
];

export const appointmentColumns: TableColumnType[] = [
  {
    column: "srNo",
    title: "Sr. No"
  },
  {
    column: "date",
    title: "Date"
  },
  {
    column: "employee",
    title: "Employee"
  },

  {
    column: "amount",
    title: "Amount"
  },
  {
    column: "status",
    title: "Status"
  },
  {
    column: "action",
    title: ""
  }
];
