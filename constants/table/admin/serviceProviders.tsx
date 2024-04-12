import Button from "components/uiElements/Button";
import { getClinics, updateClinicStatus } from "services/clinic";

interface StatusProps {
  status: string;
  onClick: () => void;
}

const Status: React.FC<StatusProps> = ({ status, onClick }) => {
  return status === "0" ? (
    <Button onClick={() => onClick()}>Approve</Button>
  ) : (
    <p>Approved</p>
  );
};

export const serviceProviderColumns = [
  {
    key: "srNo",
    dataIndex: "srNo",
    title: "Sr. No"
  },
  {
    key: "name",
    dataIndex: "name",
    title: "Service Provider"
  },
  {
    key: "contactPerson",
    dataIndex: "contactPerson",
    title: "Contact Person"
  },
  {
    key: "contactPhone",
    dataIndex: "contactPhone",
    title: "Contact Phone"
  },
  {
    key: "email",
    dataIndex: "email",
    title: "Email ID"
  },
  {
    key: "primaryAddress",
    dataIndex: "primaryAddress",
    title: "Address"
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Status",
    render: (status: string, item: any) => (
      <Status
        onClick={async () => {
          await updateClinicStatus(item?.id, Number(status) + 1);
          await getClinics();
        }}
        status={status}
      />
    )
  }
];
