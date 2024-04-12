"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import moment from "moment";

// components
import Table from "components/uiElements/table";
import Button from "components/uiElements/button";
import { getPdfUrl } from "components/uiElements/reactPdfRenderer";

// context
import { useStateValue } from "@/context/StateProvider";

// constants
import { appointmentColumns } from "constants/table/appointments";

// services
import { createCheckout } from "services/stripe";
import { updatePayment } from "services/appointment";

// types
import { AppointmentDetailsType } from "types/containers/appointments/appointmentDetails";

// assets
import ArrowDown from "@/assets/components/ArrowDown";

interface ComponentProps {
  appointment: AppointmentDetailsType;
}

const AppointmentDetails: React.FC<ComponentProps> = ({ appointment }) => {
  const router = useRouter();
  const params = useParams();

  const searchParams = useSearchParams();

  const [tableData, setTableData] = useState<any[]>([]);
  const [InvoiceUrl, setInvoiceUrl] = useState<string>("");

  const { currentUser } = useStateValue();

  useEffect(() => {
    const tableData = appointment?.relatedAppointments?.map(
      (item: any, index: number) => ({
        ...item,
        date: moment(item?.date)?.format("DD-MM-YYYY hh:mm:a") ?? "Unspecified",
        srNo: String(index + 1),
        employee:
          appointment?.employee?.firstName +
          " " +
          appointment?.employee?.lastName,
        amount: appointment?.total,
        action: () => (
          <ArrowDown
            fill="#101010"
            style={{ rotate: "-90deg", cursor: "pointer" }}
            onClick={() => router.push(`../appointments/${item._id}`)}
          />
        )
      })
    );

    setTableData(tableData);

    appointment &&
      (async () => {
        const url = await getPdfUrl(appointment);

        setInvoiceUrl(url);
      })();
  }, [appointment]);

  useEffect(() => {
    (async () => {
      const paymentSuccess = searchParams?.get("paymentSuccess");
      if (paymentSuccess) {
        const payload = {
          id: appointment?._id
        };
        const { response, error } = await updatePayment(payload);
        console.log({ error, response });

        window.location.href = "../appointments/" + params?.id;

        return response;
      }
    })();
  }, [searchParams]);

  const handlePayment = async (data: any) => {
    const payload = {
      amount: appointment?.total,
      successUrl: "/appointments/" + params?.id,
      cancelledUrl: "/appointments"
    };

    const { response, error } = await createCheckout(payload);

    if (error) {
      console.log({ error });
    }

    window.location.assign(response?.data?.url);
  };

  return (
    appointment && (
      <div className="w-full flex flex-col justify-center items-start bg-white text-black p-[32px] gap-[40px] rounded-lg">
        <div className="w-full flex flex-col justify-start items-start gap-[20px] pb-[30px] shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
          <h3 className="text-[20px] font-[500] text-blue-950">
            Employee Details
          </h3>
          <div className="w-full flex justify-start items-center flex-wrap gap-[20px]">
            <div className="flex flex-col justify-start items-start basis-[32%]">
              <h3>Employee Name</h3>
              <p>
                {appointment?.employee?.firstName +
                  " " +
                  appointment?.employee?.lastName}
              </p>
            </div>
            <div className="flex flex-col justify-start items-start basis-[32%]">
              <h3>Employee ID</h3>
              <p>{appointment?.employee?.employeeID}</p>
            </div>
            <div className="flex flex-col justify-start items-start basis-[32%]">
              <h3>Clinic</h3>
              <p>{appointment?.clinic?.name}</p>
            </div>
            <div className="flex flex-col justify-start items-start basis-[32%]">
              <h3>Preferred Date</h3>
              <p>
                {moment(appointment?.date)?.format("DD-MM-YYYY hh:mm:a") ??
                  "Unspecified"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-[20px] pb-[30px] shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
          <h3 className="text-[20px] font-[500] text-blue-950">
            Service Details
          </h3>
          <div className="w-full flex justify-start items-center flex-wrap gap-[20px]">
            <div className="flex flex-col justify-start items-start basis-[32%]">
              <h3>Service Name</h3>
              <p>{appointment?.services?.service}</p>
            </div>
            <div className="flex flex-col justify-start items-start basis-[32%]">
              <h3>Service Code</h3>
              <p>{appointment?.services?.code}</p>
            </div>
            <div className="flex flex-col justify-start items-start basis-[32%]">
              <h3>Service Price</h3>
              <p>{appointment?.services?.price}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end pr-[60px] items-start gap-[20px]">
          <Button
            label="View Invoice"
            onClick={() => window.open(InvoiceUrl)}
          />
          {Number(appointment?.status) === 0 ? (
            currentUser?.userType === "company" ? (
              <Button label="Pay Now" onClick={handlePayment} />
            ) : (
              <p className="flex justify-center items-center py-2">
                Payment Pending
              </p>
            )
          ) : Number(appointment?.status) === 1 ? (
            currentUser?.userType === "company" ? (
              <p className="flex justify-center items-center py-2">Paid</p>
            ) : (
              <Button label="Mark as completed" onClick={handlePayment} />
            )
          ) : (
            <></>
          )}
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-[20px]">
          <h3 className="text-[20px] font-[500] text-blue-950">
            Linked Appointments
          </h3>
          <Table
            rowData={tableData}
            columnData={appointmentColumns.filter(
              (item) => item.column !== "status"
            )}
          />
        </div>
      </div>
    )
  );
};

export default AppointmentDetails;
