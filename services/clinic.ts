import { getRequest, postRequest } from "services/httpHelper";
import {
  ADD_SERVICE_TO_CLINIC,
  GET_CLINIC_COMPANIES,
  GET_CLINIC_SERVICES,
  POST_CLINIC
} from "services/apiUrl";

// types
import { SuccessResponse } from "@/types/axiosTypes";

export const postClinic = async (
  clinic: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: POST_CLINIC,
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

export const addServiceToClinic = async (
  serviceId: string
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: ADD_SERVICE_TO_CLINIC,
      isAuth: true,
      data: { serviceId }
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

export const getClinicServices = async (
  id?: string
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: id ? `${GET_CLINIC_SERVICES}/${id}` : GET_CLINIC_SERVICES,
      isAuth: true
    };
    const response = await getRequest(payload);

    console.log({ response });

    if ("error" in response) {
      return { error: response };
    }

    return { response };
  } catch (error) {
    return { error };
  }
};

export const getMyCompanies = async (): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: GET_CLINIC_COMPANIES,
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
