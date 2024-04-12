// id String @id @default(auto())@map("_id") @db.ObjectId
//   day String
//   startTime DateTime
//   endTime DateTime
//   enabled Boolean
//   clinicID String @db.ObjectId
//   clinic Clinic @relation(fields: [clinicID], references: [id])
export const workingHours = [
  {
    day: "Sunday",
    startTime: new Date("October 20 2023, 9:30"),
    endTime: new Date("October 20 2023, 16:30"),
    enabled: false,
    clinicID: "6560bc63650d76a588e4f5ed"
  },
  {
    day: "Monday",
    startTime: new Date("October 20 2023, 9:30"),
    endTime: new Date("October 20 2023, 16:30"),
    enabled: true,
    clinicID: "6560bc63650d76a588e4f5ed"
  },
  {
    day: "Tuesday",
    startTime: new Date("October 20 2023, 9:30"),
    endTime: new Date("October 20 2023, 16:30"),
    enabled: true,
    clinicID: "6560bc63650d76a588e4f5ed"
  },
  {
    day: "Wednesday",
    startTime: new Date("October 20 2023, 9:30"),
    endTime: new Date("October 20 2023, 16:30"),
    enabled: true,
    clinicID: "6560bc63650d76a588e4f5ed"
  },
  {
    day: "Thursday",
    startTime: new Date("October 20 2023, 9:30"),
    endTime: new Date("October 20 2023, 16:30"),
    enabled: true,
    clinicID: "6560bc63650d76a588e4f5ed"
  },
  {
    day: "Friday",
    startTime: new Date("October 20 2023, 9:30"),
    endTime: new Date("October 20 2023, 16:30"),
    enabled: true,
    clinicID: "6560bc63650d76a588e4f5ed"
  },
  {
    day: "Saturday",
    startTime: new Date("October 20 2023, 9:30"),
    endTime: new Date("October 20 2023, 16:30"),
    enabled: true,
    clinicID: "6560bc63650d76a588e4f5ed"
  }
];
