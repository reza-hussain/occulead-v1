import { SuccessResponse } from "@/types/axiosTypes";
import { GET_USER } from "./apiUrl";
import { getRequest } from "./httpHelper";

export const getUser = async (
  id: string
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: `${GET_USER}`,
      isAuth: true
    };
    const response = await getRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response: response };
  } catch (error) {
    return { error };
  }
};
