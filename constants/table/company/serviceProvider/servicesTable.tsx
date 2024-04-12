export const servicesTable = [
  {
    id: 0,
    serviceCode: "Favourite",
    service: "Heart",
    price: "HT",
    favourites: 402,
    emailId: "sample@gm.com",
    status: "approved",
    reason: "Some Random Reason",
    menu: true
  },
  {
    id: 1,
    serviceCode: "Favourite",
    service: "Thyroid",
    price: "TY",
    favourites: 402,
    emailId: "sample@gm.com",
    status: "approved",
    reason: "Some Random Reason",
    menu: true
  },
  {
    id: 2,
    serviceCode: "Favourite",
    service: "Heart",
    price: "HT",
    favourites: 402,
    emailId: "sample@gm.com",
    status: "pending",
    reason: "Some Random Reason",
    menu: true
  },
  {
    id: 3,
    serviceCode: "Favourite",
    service: "Thyroid",
    price: "TY",
    favourites: 402,
    emailId: "sample@gm.com",
    status: "rejected",
    reason: "Some Random Reason",
    menu: true
  }
];

export const servicesColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "Sr. No"
  },
  {
    key: "serviceCode",
    dataIndex: "serviceCode",
    title: "Service Code"
  },
  {
    key: "service",
    dataIndex: "service",
    title: "Service"
  },
  {
    key: "price",
    dataIndex: "price",
    title: "Contact Phone"
  },
  {
    key: "favourites",
    dataIndex: "favourites",
    title: "Favourite"
  }
];
