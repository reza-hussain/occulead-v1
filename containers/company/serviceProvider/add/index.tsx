import React, { useEffect, useState } from "react";

// components
import SubContainer from "@/components/layouts/subContainer";
import InfoCard from "@/components/uiElements/infoCard";

// context
import { useStateValue } from "@/context/StateProvider";

// services
import { getFilteredClinics } from "@/services/company";
import { ClinicObjectType } from "types/axiosTypes";
import RequestModal from "./RequestModal";

const AddServiceProvider = () => {
  const [clinics, setClinics] = useState<ClinicObjectType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ClinicObjectType>();
  const { currentUser } = useStateValue();

  useEffect(() => {
    currentUser?.company?._id &&
      (async () => {
        const { response, error } = await getFilteredClinics(
          currentUser?.company?._id
        );

        if (response) {
          setClinics(response?.data);
        }

        if (error) {
          console.log({ error });
        }
      })();
  }, [currentUser]);

  const handleCardClick = (data: any) => {
    setModalOpen(true);
    setModalData(data);
  };

  return (
    <SubContainer title="Service Providers">
      {/* SEARCH */}

      {/* <div className="w-full dflex-start"></div> */}

      {/* CARDS */}
      <div className="w-[95%] dflex-between flex-wrap gap-y-20">
        {clinics?.map((clinic: any) => (
          <InfoCard
            data={clinic}
            key={clinic?._id}
            styles={{ flexBasis: "32%" }}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <RequestModal
        id="serviceProviderRequestModal"
        isOpen={modalOpen}
        data={modalData}
        setIsOpen={setModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </SubContainer>
  );
};
export default AddServiceProvider;
