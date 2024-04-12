import { SuccessResponse } from "@/types/axiosTypes";
import { LOGIN_USER, REGISTER_USER, VERIFY_EMAIL } from "./apiUrl";
import { postRequest } from "./httpHelper";

export type registerUserType = {
  email: string;
  password: string;
};

export type loginUserType = {
  email: string;
  password: string;
};

export const registerUser = async (
  data: registerUserType
): Promise<{ response?: SuccessResponse<any>; error?: any }> => {
  try {
    const payload = {
      data,
      url: REGISTER_USER
    };
    const response = await postRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response };
  } catch (error) {
    return { error };
  }
};

export const loginUser = async (
  data: loginUserType
): Promise<{ response?: SuccessResponse<any>; error?: any }> => {
  try {
    const payload = {
      data,
      url: LOGIN_USER
    };
    const response = await postRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response };
  } catch (error) {
    return { error };
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const payload = {
      data: token,
      url: VERIFY_EMAIL
    };

    const response = await postRequest(payload);

    return response;
  } catch (err) {
    return err;
  }
};
