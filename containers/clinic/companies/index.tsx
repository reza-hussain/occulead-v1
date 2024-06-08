import React, { useEffect, useState } from "react";

// components
import SubContainer from "components/layouts/subContainer";
import Table from "components/uiElements/table";

// constants
import { companiesColumn } from "constants/table/clinic/company";

// services
import { getMyCompanies } from "services/clinic";
import TableDropdown from "components/uiElements/table/dropdown";
import { updateContract } from "services/contracts";
import Tabs from "components/uiElements/tabs";

const statusOptions = [
  {
    label: "Pending",
    value: "0"
  },
  {
    label: "Approved",
    value: "1"
  },
  {
    label: "Hold",
    value: "3"
  },
  {
    label: "Declined",
    value: "4"
  }
];

const tabItems = [
  {
    name: "Pending",
    status: "0"
  },
  {
    name: "Approved",
    status: "1"
  },
  {
    name: "Declined",
    status: "2"
  },
  {
    name: "Hold",
    status: "3"
  }
];

const Companies = () => {
  const [companiesRow, setCompaniesRow] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const [activeTab, setActiveTab] = useState("1");

  const fetchData = async () => {
    const { response, error } = await getMyCompanies();

    console.log({ response });

    if (response) {
      const rowData = response?.data?.map((company: any, idx: number) => ({
        srNo: `${idx + 1}`,
        name: company?.name,
        contact: company?.contact,
        primaryAddress: company?.primaryAddress,
        email: company?.email,
        statusNum: String(company?.status),
        status: () => (
          <TableDropdown
            options={statusOptions}
            value={company.status}
            data={company}
            onChange={handleStatusDropdown}
          />
        )
      }));
      setCompaniesRow(rowData);
      setFilteredCompanies(
        rowData?.filter((row: any) => row.statusNum === activeTab)
      );
    }

    if (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = companiesRow?.filter(
      (item: any) => item?.statusNum == activeTab
    );

    setFilteredCompanies(filteredData);

    // eslint-disable-next-line
  }, [activeTab, companiesRow]);

  const handleStatusDropdown = async (val: string, data: any) => {
    const payload = { _id: data?._id, status: Number(val) };
    await updateContract(payload);
    fetchData();
    return;
  };

  return (
    <SubContainer title="Companies">
      <Tabs items={tabItems} setActive={setActiveTab} active={activeTab} />
      <Table columnData={companiesColumn} rowData={filteredCompanies} />
    </SubContainer>
  );
};
export default Companies;
