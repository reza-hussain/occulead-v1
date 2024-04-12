export const phonePattern = {
  value: /^\+?[0-9]\d{1,20}$/,
  message: "Invalid phone"
};
export const emailPattern = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: "Invalid email"
};
export const zipCodePattern = /^\d{5}(?:-\d{4})?$/;

export const validationOptions = {
  text: {
    empty: (e: string) => e?.length !== 0 || "Name is required",
    minLength: (e: string) =>
      e?.length >= 3 || "Name should be atleast 3 characters"
  },
  phone: {
    empty: (e: string) => e?.length !== 0 || "Phone number is required",
    minLength: (e: string) => e?.length === 10 || "Invalid phone number"
  },
  email: {
    empty: (e: string) => e?.length !== 0 || "Email Address is required"
  },
  zipCode: {
    empty: (e: string) => e?.length !== 0 || "Zip Code is required",
    validZipCode: (e: string) => e.match(zipCodePattern) || "Invalid Zip Code"
  }
};
