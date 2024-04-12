import DownloadFile from "app/components/Table/DownloadFile";

export const paymentData = [
  {
    id: 0,
    description: "Payment for Invoice",
    receiptNumber: "REC1",
    company: "Amazon",
    modeOfPayment: "Cheque",
    transactionDate: "2022-10-08",
    amount: "20000",
    downloadReceipt: ""
  }
];

export const paymentColumns = [
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
    key: "receiptNumber",
    dataIndex: "receiptNumber",
    title: "Receipt Number"
  },
  {
    key: "company",
    dataIndex: "company",
    title: "Company"
  },
  {
    key: "modeOfPayment",
    dataIndex: "modeOfPayment",
    title: "Mode Of Payment"
  },
  {
    key: "transactionDate",
    dataIndex: "transactionDate",
    title: "Transaction Date"
  },
  {
    key: "amount",
    dataIndex: "amount",
    title: "Paid Amount"
  },
  {
    key: "downloadReceipt",
    dataIndex: "downloadReceipt",
    title: "Download Receipt",
    render: () => <DownloadFile />
  }
];
