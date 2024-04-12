"use client";
import React, { useState } from "react";

// context
import { useStateValue } from "@/context/StateProvider";

// components
import FormModal from "components/modals/formModal";
import DocumentUpload from "@/components/formElements/DocumentUpload";

// services
import { createContract } from "services/contracts";

interface RequestModalProps {
  data: any;
  onClose: () => void;
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestModal: React.FC<RequestModalProps> = ({
  data,
  onClose = () => {},
  id = "",
  isOpen,
  setIsOpen
}) => {
  const { currentUser } = useStateValue();
  const [file, setFile] = useState<string>("");
  isOpen && console.log({ data });

  const handleSendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      clinic: data?._id,
      company: currentUser?.company?._id
    };
    console.log({ payload });
    const contract = await createContract(payload);

    console.log({ contract });
    onClose();
    return contract;
  };

  return (
    <FormModal
      title="Request Service Provider"
      onSubmit={handleSendRequest}
      id={id}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DocumentUpload id="addDocument" setFile={setFile} file={file} />

      <textarea
        className="w-full appearance-none p-[10px] border border-gray-200 outline-none rounded-md focus:border-blue-500"
        placeholder="Enter Reason"
        rows={4}
      />
    </FormModal>
  );
};

export default RequestModal;
