export type OnboardingFormValues = {
  userType: "clinic" | "company";
  logo: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  primaryAddress: string;
  secondaryAddress: string;
  zipCode: string;
  fax: string;
  country: string;
  state: string;
  city: string;
  description: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  responsibleDetails?: any;
  billingDetails?: any;
};