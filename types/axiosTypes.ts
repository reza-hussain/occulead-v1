import { AxiosRequestHeaders } from "axios";

export type SendRequestArgs = {
  url: string;
  headers: AxiosRequestHeaders;
  isAuth: boolean;
  data: {};
  serverCookie: string;
  isServer: boolean;
  userType: string;
  method: "get" | "post" | "put" | "delete";
};

export type ResponseConfig = {
  data: {};
  headers: AxiosRequestHeaders;
  error: {};
};

export type ResponseType<T> = ErrorResponse | SuccessResponse<T>;

export type SuccessResponse<T> = {
  data: T;
  message: string;
  status: number;
  success: boolean;
};

export type ErrorResponse = {
  error: any;
  message: string;
  status: number;
  success: boolean;
};

export type ClinicObjectType = {
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  contracts: [];
  _id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  status: number;
  fax: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  documents: any[];
  user: string;
  services: string[];
  description: string;
  primaryAddress: string;
  secondaryAddress: string;
};
