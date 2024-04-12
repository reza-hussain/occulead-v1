import { getRequest, postRequest } from "./httpHelper";
import {
  CREATE_STRIPE_PAYMENT,
  GET_STRIPE_PRODUCTS,
  STRIPE_APPOINTMENT_CHECKOUT
} from "./apiUrl";
import { SuccessResponse } from "types/axiosTypes";

export const getStripeProducts = async (): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: GET_STRIPE_PRODUCTS,
      isAuth: true
    };
    const response = await getRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response };
  } catch (error) {
    return { error: error };
  }
};

export const createPayment = async (
  data: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: CREATE_STRIPE_PAYMENT,
      isAuth: true,
      data
    };
    const response = await postRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response: response };
  } catch (error) {
    return { error };
  }
};

export const createCheckout = async (
  data: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: STRIPE_APPOINTMENT_CHECKOUT,
      isAuth: true,
      data
    };
    const response = await postRequest(payload);

    if ("error" in response) {
      return { error: response };
    }

    return { response: response };
  } catch (error) {
    return { error };
  }
};
