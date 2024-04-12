export const company = [
  {
    label: "Amazon",
    value: "Amazon"
  },
  {
    label: "Google",
    value: "Google"
  },
  {
    label: "Flipkart",
    value: "Flipkart"
  },
  {
    label: "Ebay",
    value: "Ebay"
  },
  {
    label: "Microsoft",
    value: "Microsoft"
  },
  {
    label: "Uber",
    value: "Uber"
  },
  {
    label: "OLA",
    value: "OLA"
  }
];

// id String @id @default(auto())@map("_id") @db.ObjectId
//   accountType String
//   status String? @default("pending")
//   profileStatus String? @default("")
//   profilePic Json
//   name String
//   email String @unique
//   phone String
//   website String
//   primaryAddress String
//   secondaryAddress String
//   zipCode String
//   fax String
//   country String
//   state String
//   city String
//   description String?
//   images String[]
//   contactPerson String
//   contactEmail String
//   contactPhone String
//   reason String? @default("")
//   documents Json
//   user User @relation(fields: [userEmail], references: [email])
//   userEmail String @unique

export const payload = {
  profilePic: "practo",
  accountType: "clinic",
  status: "pending",
  profileStatus: "unsubscribed",
  name: "practo",
  email: "practo",
  phone: "practo",
  website: "practo",
  primaryAddress: "practo",
  secondaryAddress: "practo",
  zipCode: "practo",
  fax: "practo",
  country: "practo",
  state: "practo",
  city: "practo",
  contactPerson: "practo",
  contactEmail: "practo",
  contactPhone: "practo",
  userEmail: "alirezaa08@gmail.com",
  documents: {}
};
