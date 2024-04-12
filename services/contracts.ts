import { postRequest } from "./httpHelper";
import { CREATE_CONTRACT, UPDATE_CONTRACT } from "./apiUrl";
import { SuccessResponse } from "types/axiosTypes";

export const createContract = async (
  body: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: CREATE_CONTRACT,
      isAuth: true,
      data: body
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

export const updateContract = async (
  body: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: UPDATE_CONTRACT,
      isAuth: true,
      data: body
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
