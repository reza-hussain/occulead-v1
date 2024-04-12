import ArrowDown from "@/app/components/Icons/ArrowDown";
import Status from "@/app/components/Table/Status";

export const invoicesTable = [
  {
    invoiceNo: 0,
    description: "Paid",
    invoiceDate: "Heart",
    totalAmount: "HT",
    paid: 402,
    totalOutstanding: "sample@gm.com",
    status: "approved",
    menu: true
  },
  {
    invoiceNo: 1,
    description: "Paid",
    invoiceDate: "Test",
    totalAmount: "TY",
    paid: 402,
    totalOutstanding: "sample@gm.com",
    emailId: "sample@gm.com",
    status: "approved",
    menu: true
  },
  {
    invoiceNo: 2,
    description: "Paid",
    invoiceDate: "Heart",
    totalAmount: "HT",
    paid: 402,
    totalOutstanding: "sample@gm.com",
    emailId: "sample@gm.com",
    status: "pending",
    menu: true
  },
  {
    invoiceNo: 3,
    description: "p",
    invoiceDate: "Test",
    totalAmount: "TY",
    paid: 402,
    totalOutstanding: "sample@gm.com",
    emailId: "sample@gm.com",
    status: "rejected",
    menu: true
  }
];

export const invoicesColumns = [
  {
    key: "invoiceNo",
    dataIndex: "invoiceNo",
    title: "Invoice No."
  },
  {
    key: "description",
    dataIndex: "description",
    title: "Description"
  },
  {
    key: "invoiceDate",
    dataIndex: "invoiceDate",
    title: "Invoice Date"
  },
  {
    key: "totalAmount",
    dataIndex: "totalAmount",
    title: "Total Amount"
  },
  {
    key: "paid",
    dataIndex: "paid",
    title: "Paid"
  },
  {
    key: "totalOutstanding",
    dataIndex: "totalOutstanding",
    title: "Total Outstanding"
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Status",
    render: (text: string) => <Status status={text} />
  },
  {
    key: "menu",
    dataIndex: "menu",
    title: "",
    render: (_: string, item: any) => (
      <ArrowDown className="-rotate-90 cursor-pointer" id={item.id} />
    ),
    cellStyles: {
      width: "50%",
      position: "absolute",
      left: 0,
      top: 0
    }
  }
];
