import { TableColumnType } from "@/types/components/uiElements/Table";

export const serviceProviderTable = [
  {
    id: 0,
    serviceProvider: "Favourite",
    contactPerson: "Heart",
    contactPhone: "HT",
    address: 402,
    emailId: "sample@gm.com",
    status: "approved",
    reason: "Some Random Reason",
    menu: true
  },
  {
    id: 1,
    serviceProvider: "Favourite",
    contactPerson: "Thyroid",
    contactPhone: "TY",
    address: 402,
    emailId: "sample@gm.com",
    status: "approved",
    reason: "Some Random Reason",
    menu: true
  },
  {
    id: 2,
    serviceProvider: "Favourite",
    contactPerson: "Heart",
    contactPhone: "HT",
    address: 402,
    emailId: "sample@gm.com",
    status: "pending",
    reason: "Some Random Reason",
    menu: true
  },
  {
    id: 3,
    serviceProvider: "Favourite",
    contactPerson: "Thyroid",
    contactPhone: "TY",
    address: 402,
    emailId: "sample@gm.com",
    status: "rejected",
    reason: "Some Random Reason",
    menu: true
  }
];

export const serviceProviderColumns: TableColumnType[] = [
  {
    column: "srNo",
    title: "Sr. No"
  },
  {
    column: "name",
    title: "Service Provider"
  },
  {
    column: "contactPerson",
    title: "Contact Person"
  },
  {
    column: "contactPhone",
    title: "Contact Phone"
  },
  {
    column: "email",
    title: "Email ID",
    cellStyles: {
      width: "15%"
    }
  },
  {
    column: "primaryAddress",
    title: "Address"
  },
  {
    column: "status",
    title: "Status",
    cellStyles: {
      width: "7%"
    }
  },
  {
    column: "reason",
    title: "Reason",
    cellStyles: {
      width: "15%"
    }
  }
];
