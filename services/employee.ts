// services
import { GET_EMPLOYEES, POST_EMPLOYEE } from "services/apiUrl";
import { getRequest, postRequest } from "services/httpHelper";

// types
import { SuccessResponse } from "@/types/axiosTypes";

export const getEmployees = async (
  companyID?: string
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: companyID ? `${GET_EMPLOYEES}/${companyID}` : GET_EMPLOYEES,
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

export const postEmployee = async (
  employee: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: POST_EMPLOYEE,
      isAuth: true,
      data: employee
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
