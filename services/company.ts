import { getRequest, postRequest } from "services/httpHelper";
import {
  GET_APPROVED_CLINICS,
  GET_FILTERED_CLINICS,
  GET_MY_CLINICS,
  POST_COMPANY
} from "services/apiUrl";

// types
import { SuccessResponse } from "@/types/axiosTypes";

export const postCompany = async (
  clinic: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: POST_COMPANY,
      isAuth: true,
      data: clinic
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

export const getFilteredClinics = async (
  companyID: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: `${GET_FILTERED_CLINICS}/${companyID}`,
      isAuth: true
    };
    const response = await getRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response };
  } catch (error) {
    return { error };
  }
};

export const getMyClinics = async (): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: `${GET_MY_CLINICS}`,
      isAuth: true
    };
    const response = await getRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response };
  } catch (error) {
    return { error };
  }
};

export const getApprovedClinics = async (): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: GET_APPROVED_CLINICS,
      isAuth: true
    };
    const response = await getRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response };
  } catch (error) {
    return { error };
  }
};
