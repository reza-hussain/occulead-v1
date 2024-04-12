import {
  ErrorResponse,
  ResponseType,
  SendRequestArgs,
  SuccessResponse
} from "@/types/axiosTypes";
import { getCookie } from "@/utils/storageHelper";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const sendRequest = async (
  args: SendRequestArgs
): Promise<ResponseType<any>> => {
  try {
    const { url, headers, isAuth, data, userType } = args;

    const bearerToken = getCookie("token");

    let headerParams;

    if (isAuth) {
      if (headers) {
        headerParams = {
          ...headers,
          authToken: ""
        };
      } else {
        headerParams = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
          userType
        };
      }
    }

    const config: AxiosRequestConfig = {
      ...args,
      headers: headerParams,
      url
    };

    if (data) {
      config.data = data;
    }

    const response: AxiosResponse = await axios(config);
    return response?.data;
  } catch (err: any) {
    const error: ErrorResponse = {
      error: err?.response?.data.error ?? "",
      status: err?.response?.data?.status,
      message: err?.response?.data?.message,
      success: err?.response?.data?.success
    };

    return error;
  }
};

export const getRequest = async (args: any): Promise<ResponseType<any>> => {
  const response = await sendRequest({
    ...args,
    method: "get",
    userType: "clinic"
  });

  if (response && "error" in response) {
    return response as ErrorResponse;
  }

  return response as SuccessResponse<any>;
};

export const postRequest = async (args: any): Promise<ResponseType<any>> => {
  const response = await sendRequest({
    ...args,
    method: "post"
  });

  if (response && "error" in response) {
    return response as ErrorResponse;
  }

  return response as SuccessResponse<any>;
};
