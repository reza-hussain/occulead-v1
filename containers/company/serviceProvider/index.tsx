import React, { useEffect, useState } from "react";
import Link from "next/link";

// components
import SubContainer from "@/components/layouts/subContainer";
import Button from "@/components/uiElements/button";
import Table from "@/components/uiElements/table";

// context
import { useStateValue } from "@/context/StateProvider";

// constants
import { serviceProviderColumns } from "@/constants/table/company/serviceProviders";

// services
import { getMyClinics } from "@/services/company";
import { ClinicObjectType } from "@/types/axiosTypes";
import Status from "@/components/uiElements/table/status";

const ServiceProvider = () => {
  const [clinics, setClinics] = useState<ClinicObjectType[]>([]);

  const { currentUser } = useStateValue();

  const HeadingButtons = () => (
    <div className="flex justify-center items-center gap-[12px]">
      <Link href="/service-providers/add">
        <Button
          className="bg-[#11a1fd] p-[10px] text-[14px] rounded-md"
          label="Add Service Provider"
        />
      </Link>
    </div>
  );

  useEffect(() => {
    currentUser?.company?._id &&
      (async () => {
        const { response, error } = await getMyClinics();

        if (response) {
          const rowData = response?.data?.map(
            (clinic: ClinicObjectType, idx: number) => ({
              srNo: `${idx + 1}`,
              name: clinic?.name,
              contactPerson: clinic?.contact,
              contactPhone: clinic?.phone,
              email: clinic?.email,
              primaryAddress: clinic?.primaryAddress,
              status: () => <Status status={clinic?.status} />,
              reason: "some reason"
            })
          );
          setClinics(rowData);
        }

        if (error) {
          console.log({ error });
        }
      })();
  }, [currentUser]);

  return (
    <SubContainer
      showHeaderSiblings={true}
      headerSiblings={<HeadingButtons />}
      title="Service Providers"
    >
      <Table
        isFixed={true}
        columnData={serviceProviderColumns}
        rowData={clinics}
      />

      {/* <ImportServiceModal />     */}
    </SubContainer>
  );
};
export default ServiceProvider;
