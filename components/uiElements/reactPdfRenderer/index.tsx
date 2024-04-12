// import React from 'react';
"use client";
import { AppointmentDetailsType } from "@/types/containers/appointments/appointmentDetails";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf
} from "@react-pdf/renderer";
import moment from "moment";

// import img from "@/assets/images/logo.png";
// import { useState} from "react";

// Some styles are directly used and some through this object

interface DataProps {
  data: AppointmentDetailsType;
}

const styles = StyleSheet.create({
  pageWraper: {
    backgroundColor: "#fff",
    fontSize: 12,
    paddingTop: 35,
    paddingBottom: 65
  },
  page: {
    flexDirection: "column"
  },
  header: {
    fontSize: 20
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 40
  },
  textStyle: {
    width: "20px"
  }
});

const styleUtils = {
  universalPad: {
    padding: "16px"
  },
  fontsm: {
    fontSize: 12
  },
  fontmd: {
    fontSize: 13
  },
  borderBottom: {
    borderBottom: "1px solid #EBEBEB"
  },
  borderAll: {
    border: "1px solid #EBEBEB"
  },
  leftPad: {
    padding: "0cm 0cm 0cm 1cm"
  },
  rightPad: {
    padding: "0cm 1cm 0cm 0cm"
  },
  horizontalPad: {
    padding: "0cm 1cm 0cm 1cm"
  },
  verticalPad: {
    padding: "1cm 0cm 1cm 0cm"
  }
};

const PdfLayout: React.FC<DataProps> = ({ data }) => {
  // const [logo, setLogo] = useState<File>();
  // console.log({data});

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(img);
  //     const blob = await response?.blob();
  //     const file = new File([blob], "logo", {type: blob.type});
  //     setLogo(file);
  //     console.log();
  //   })();
  // }, []);

  const billData = {
    billTo: data?.company?.name,
    invoiceNo: data?.invoiceID ?? "12345",
    date: moment(data?.date).format("DD-MMM-YYYY")
  };

  const cumDetails = {
    subTotal: Number(data.total) - Number(data.total) * 0.18,
    tax: "18%",
    total: data?.total
  };

  return (
    <View style={styles.page}>
      <Header />
      <BillDetails data={billData} />
      <LineItem data={data} />
      <CumDetails data={cumDetails} />
      {/* <Footer /> */}
      <Text
        style={[
          styleUtils.universalPad,
          {
            color: "#707070"
            // position: 'absolute',
            // bottom: 0,
            // left: 0,
          }
        ]}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </View>
  );
};

export const getPdfUrl = async (data: AppointmentDetailsType) => {
  const document = (
    <Document>
      <Page size="A4" style={[styles.pageWraper, {}]}>
        <PdfLayout data={data} />
      </Page>
    </Document>
  );

  const blobPDf = await pdf(document);
  blobPDf.updateContainer(document);
  const result = await blobPDf.toBlob();
  const url = URL.createObjectURL(result);

  return url;
};

const Header = () => (
  <View style={[styles.flexRow, styleUtils.universalPad]}>
    <View>
      {/* eslint-disable-next-line */}
      <Text>Occulead</Text>
    </View>
    <View>
      <Text style={[styles.header]}>Appointment Invoice</Text>
    </View>
  </View>
);

const BillDetails: React.FC<any> = ({ data }) => (
  <View
    style={[
      styles.flexRow,
      {
        borderTop: "1px solid #EBEBEB",
        borderBottom: "1px solid #EBEBEB",
        padding: "20px"
      }
    ]}
  >
    <View
      style={{
        flexBasis: "30%",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={[{ paddingBottom: "0.25cm" }]}>Bill to:</Text>
      <Text style={[{ color: "#333333" }]}>{data?.billTo}</Text>
    </View>
    <View
      style={{
        flexBasis: "30%",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={[{ paddingBottom: "0.25cm" }]}>Invoice No:</Text>
      <Text style={[{ color: "#333333" }]}>{data?.invoiceNo}</Text>
    </View>
    <View
      style={{
        flexBasis: "30%",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={[{ paddingBottom: "0.25cm" }]}>Issue Date:</Text>
      <Text style={[{ color: "#333333" }]}>{data?.date}</Text>
    </View>
  </View>
);

const LineItem: React.FC<DataProps> = ({ data }) => {
  console.log({ data });

  return (
    <View>
      <View
        style={[
          styles.flexRow,
          styleUtils.universalPad,
          {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EBEBEB"
          }
        ]}
      >
        <Text style={{ flexBasis: "40%" }}>Description</Text>
        <Text style={{ flexBasis: "30%" }}>Employee</Text>
        <Text style={{ flexBasis: "20%" }}>Employee ID</Text>
        <Text style={{ flexBasis: "10%" }}>Amount</Text>
      </View>
      <Item item={data} />
    </View>
  );
};

const Item = ({ item }: { item: AppointmentDetailsType }) => {
  console.log({ item });

  return (
    <View style={[styles.flexRow, { padding: "0.5cm 1cm 0.5cm 1cm" }]}>
      <View style={{ flexBasis: "40%" }}>
        <Text style={[{ paddingBottom: "0.25cm" }]}>
          {item?.services?.service}
        </Text>
      </View>
      <View style={{ flexBasis: "30%" }}>
        <Text
          style={[{ paddingBottom: "0.25cm" }]}
        >{`${item.employee?.firstName} ${item.employee?.lastName}`}</Text>
      </View>
      <View style={{ flexBasis: "10%" }}>
        <Text style={[{ paddingBottom: "0.25cm" }]}>
          {item.employee?.employeeID}
        </Text>
      </View>
      <View style={{ flexBasis: "10%" }}>
        <Text style={[{ paddingBottom: "0.25cm", alignSelf: "flex-end" }]}>
          {item?.services?.price}
        </Text>
      </View>
    </View>
  );
};

const CumDetails: React.FC<any> = ({ data }) => (
  <>
    <View
      style={[
        styleUtils.universalPad,
        {
          flexDirection: "row",
          justifyContent: "flex-start",
          borderTop: "1px solid #EBEBEB",
          borderBottom: "1px solid #EBEBEB"
        }
      ]}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%"
        }}
      >
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingBottom: "0.25cm",
              width: "30%"
            }
          ]}
        >
          <Text style={[{ paddingTop: "40px", paddingRight: "10px" }]}>
            Sub total
          </Text>
          <Text style={[{ paddingTop: "40px", marginLeft: "auto" }]}>
            {data?.subTotal}
          </Text>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "30%"
            }
          ]}
        >
          <Text style={[{ paddingTop: "40px", paddingRight: "10px" }]}>
            <Text style={[{ color: "#707070" }]}>Additional</Text> - IGST:
          </Text>
          <Text style={[{ paddingTop: "40px", marginLeft: "auto" }]}>
            {data?.tax}
          </Text>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "30%"
            }
          ]}
        >
          <Text style={[{ paddingTop: "40px", paddingRight: "10px" }]}>
            <Text>Total</Text>:
          </Text>
          <Text style={[{ paddingTop: "40px", marginLeft: "auto" }]}>
            {data?.total}
          </Text>
        </View>
      </View>
    </View>
    <View
      style={[
        {
          flexDirection: "row",
          padding: "0.5cm 1cm 0.5cm 1cm",
          justifyContent: "flex-end",
          borderBottom: "1px solid #EBEBEB"
        }
      ]}
    ></View>
  </>
);

// const Footer: React.FC<DataProps> = () => (
//   <View style={[styles.flexRow, styleUtils.universalPad, {}]}>
//     <View>
//       <Text style={{fontSize: 16, paddingBottom: "0.4cm"}}>Payment Info:</Text>
//       <Text style={[{paddingBottom: "0.2cm"}]}>
//         <Text style={[{color: "#333333"}]}>Bank Details:</Text> IDFC FIRST BANK
//       </Text>
//       <Text style={[{paddingBottom: "0.2cm"}]}>
//         <Text style={[{color: "#333333"}]}>Account Number:</Text> 10076297691
//       </Text>
//       <Text style={[{paddingBottom: "0.2cm"}]}>
//         <Text style={[{color: "#333333"}]}>IFSC CODE:</Text> IDFB0040106
//       </Text>
//       <Text style={[{paddingBottom: "0.2cm"}]}>
//         <Text style={[{color: "#333333"}]}>Branch:</Text> Nariman Point
//       </Text>
//       <Text style={[{paddingBottom: "0.2cm", color: "#333333"}]}>
//         Please issue cheque in favor of:
//       </Text>
//       <Text>Midas Fintech Solutions Private Limited</Text>
//     </View>
//     <View
//       style={{
//         flexDirection: "column",
//         justifyContent: "space-between",
//         height: "100%",
//       }}
//     >
//       <Text style={{textAlign: "right"}}>
//         Midas Fintech Solutions Private Limited
//       </Text>
//       <Text>Sign Here</Text>
//       <Text style={{textAlign: "right"}}>Authorized Signatory</Text>
//     </View>
//   </View>
// );
