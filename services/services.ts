import { getRequest, postRequest } from "services/httpHelper";
import {
  GET_SPECIALITIES,
  GET_SPECIALITIES_FROM_SERVICE
} from "services/apiUrl";

// types
import { SuccessResponse } from "types/axiosTypes";

export const getAllSpecialities = async (): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: GET_SPECIALITIES,
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

export const getServicesFromSpeciality = async (
  speciality: string
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: GET_SPECIALITIES_FROM_SERVICE,
      isAuth: true,
      data: {
        speciality
      }
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
