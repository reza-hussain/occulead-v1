import Status from "@/app/components/Table/Status";

export const appointmentDatesTable = [
  {
    id: 0,
    description: "Favourite",
    appointmentDate: "12-08-2023",
    status: "pending"
  },
  {
    id: 1,
    description: "Favourite",
    appointmentDate: "12-08-2023",
    status: "approved"
  },
  {
    id: 2,
    description: "Favourite",
    appointmentDate: "12-08-2023",
    status: "pending"
  },
  {
    id: 3,
    description: "Favourite",
    appointmentDate: "12-08-2023",
    status: "approved"
  }
];

export const appointmentDatesColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "Sr. No"
  },
  {
    key: "description",
    dataIndex: "description",
    title: "Description"
  },
  {
    key: "appointmentDate",
    dataIndex: "appointmentDate",
    title: "Appointment Date"
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Status",
    render: (text: string) => <Status status={text} />
  }
];
