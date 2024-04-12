import React, { useEffect, useState } from "react";

interface ComponentProps {
  status: number;
  options?: string[];
}

const Status: React.FC<ComponentProps> = ({ status, options }) => {
  const [currentStatus, setCurrentStatus] = useState<{
    status: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    switch (status) {
      default:
        setCurrentStatus({
          status: options?.[0] ?? "Pending",
          color: "bg-[#FFD93D]"
        });
        return;
      case 1:
        setCurrentStatus({
          status: options?.[1] ?? "Approved",
          color: "bg-[#6BCB77]"
        });
        return;
      case 2:
        setCurrentStatus({
          status: options?.[2] ?? "Hold",
          color: "bg-[#4D96FF]"
        });
        return;
      case 3:
        setCurrentStatus({
          status: options?.[3] ?? "Declined",
          color: "bg-[#FF6B6B]"
        });
    }
  }, [status]);

  return (
    <span
      className={`w-full dflex-center text-gray-700 ${currentStatus?.color} p-1 rounded-lg`}
    >
      {currentStatus?.status}
    </span>
  );
};

export default Status;
