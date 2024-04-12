// services
import { postRequest } from "services/httpHelper";
import {
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT_PAYMENT
} from "services/apiUrl";

// types
import { SuccessResponse } from "types/axiosTypes";
import { AppointmentPayload } from "types/containers/appointments/appointmentForm";

export const createAppointment = async (
  appointment: AppointmentPayload[]
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: CREATE_APPOINTMENT,
      isAuth: true,
      data: appointment
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

export const updatePayment = async (
  data: any
): Promise<{
  response?: SuccessResponse<any>;
  error?: any;
}> => {
  try {
    const payload = {
      url: UPDATE_APPOINTMENT_PAYMENT,
      isAuth: true,
      data
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
