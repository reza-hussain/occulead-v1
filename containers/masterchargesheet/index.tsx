import React, { useEffect, useState } from "react";

// components
import SubContainer from "@/components/layouts/subContainer";
import Button from "@/components/uiElements/button";
import Table from "@/components/uiElements/table";
import GetServiceModal from "@/components/modals/masterchargesheet/GetServiceModal";

// constants
import { masterChargeColumns } from "@/constants/table/clinic/masterChargeSheet";

// services
import { getClinicServices } from "@/services/clinic";

const MasterChargeSheet = () => {
  const [servicesRow, setServicesRow] = useState([]);
  const [masterModalOpen, setMasterModalOpen] = useState(false);
  //   const [serviceModalOpen, setServiceModalOpen] = useState(false);

  const HeadingButtons = () => (
    <div className="flex justify-center items-center gap-[12px]">
      <Button
        className="bg-[#11a1fd] p-[10px] text-[14px] rounded-md"
        onClick={() => setMasterModalOpen((prev) => !prev)}
        label="Get Services from Occulead"
      />

      {/* <Button
        onClick={() => setServiceModalOpen((prev) => !prev)}
        className="bg-[#11a1fd] p-[10px] text-[14px] rounded-md"
        label="Import Services"
      /> */}
    </div>
  );

  useEffect(() => {
    (async () => {
      const { response, error } = await getClinicServices();

      if (response) {
        const rowData = response?.data?.services?.map(
          (service: any, idx: number) => ({
            srNo: `${idx + 1}`,
            speciality: service?.speciality,
            service: service?.service,
            code: service?.code,
            price: service?.price,
            description: service?.description,
            menu: true
          })
        );
        setServicesRow(rowData);
      }

      if (error) {
        console.log({ error });
      }
    })();
  }, []);

  return (
    <SubContainer
      showHeaderSiblings={true}
      headerSiblings={<HeadingButtons />}
      title="Master Charge Sheet"
    >
      <Table columnData={masterChargeColumns} rowData={servicesRow} />

      <GetServiceModal
        isOpen={masterModalOpen}
        setIsOpen={setMasterModalOpen}
      />
      {/* <ImportServiceModal />     */}
    </SubContainer>
  );
};
export default MasterChargeSheet;
