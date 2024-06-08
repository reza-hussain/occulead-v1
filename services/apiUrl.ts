const BASE_URL = "http:///localhost:8080/api";
// const BASE_URL = "https://occulead-backend.onrender.com";

// auth
export const REGISTER_USER = `${BASE_URL}/auth/registerUser`;
export const LOGIN_USER = `${BASE_URL}/auth/loginUser`;

// token verification
export const VERIFY_EMAIL = `${BASE_URL}/auth/verifyToken`;

// stripe
export const GET_STRIPE_PRODUCTS = `${BASE_URL}/subscriptions/getProducts`;
export const CREATE_STRIPE_PAYMENT = `${BASE_URL}/subscriptions/createPayment`;
export const GET_STRIPE_SESSION_SUCCESS = `${BASE_URL}/subscriptions/payment/success`;
export const STRIPE_APPOINTMENT_CHECKOUT = `${BASE_URL}/subscriptions/createAppointmentCheckout`;

// users
export const GET_USER = `${BASE_URL}/users/getUser`;
export const GET_USER_BY_EMAIL = `${BASE_URL}/users/getUserByEmail`;

// clinics
export const POST_CLINIC = `${BASE_URL}/clinics/postClinic`;
export const GET_CLINIC_SERVICES = `${BASE_URL}/clinics/getServices`;
export const ADD_SERVICE_TO_CLINIC = `${BASE_URL}/clinics/addService`;
export const GET_CLINIC_COMPANIES = `${BASE_URL}/clinics/getCompanies`;

// companies
export const POST_COMPANY = `${BASE_URL}/companies/postCompany`;
export const GET_FILTERED_CLINICS = `${BASE_URL}/companies/getFilteredClinics`;
export const GET_APPROVED_CLINICS = `${BASE_URL}/companies/getApprovedClinics`;
export const GET_MY_CLINICS = `${BASE_URL}/companies/getClinics`;
export const POST_EMPLOYEE = `${BASE_URL}/companies/postEmployee`;
export const GET_EMPLOYEES = `${BASE_URL}/companies/getEmployees`;

// services
export const GET_SPECIALITIES = `${BASE_URL}/services/get-all-specialities`;
export const GET_SPECIALITIES_FROM_SERVICE = `${BASE_URL}/services/get-services-by-speciality`;

// contracts
export const CREATE_CONTRACT = `${BASE_URL}/contracts/postContract`;
export const UPDATE_CONTRACT = `${BASE_URL}/contracts/updateContract`;

// appointments
export const CREATE_APPOINTMENT = `${BASE_URL}/appointments/createAppointment`;
export const GET_ALL_APPOINTMENTS = `${BASE_URL}/appointments/getAllAppointments`;
export const GET_APPOINTMENT = `${BASE_URL}/appointments/getAppointment`;
export const UPDATE_APPOINTMENT_PAYMENT = `${BASE_URL}/appointments/updatePayment`;
