import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import logService from "./logService";
import config from "../../config.json";

const apiClient = axios.create({ baseURL: config.API_BASE_URL });

type CustomErrorHandling = (e: AxiosError) => Promise<any>;

let customErrorHandling: CustomErrorHandling;
const setCustomErrorHandling = (func: CustomErrorHandling) => (customErrorHandling = func);

const errorHandler = async (error: AxiosError) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    logService.log(error);
    toast.error("خطای سرور یا عدم اتصال به اینترنت!");
  }

  try {
    const result = await customErrorHandling(error);
    if (result) return result;
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

const setToken = (jwt: string | null) => {
  if (jwt) apiClient.defaults.headers.common["Authorization"] = "Bearer " + jwt;
  else delete apiClient.defaults.headers.common["Authorization"];
};

apiClient.interceptors.response.use(null, errorHandler);
apiClient.defaults.withCredentials = true; // to be able to send cookies with the requests.

export const authUtils = { setToken, setCustomErrorHandling };

export default apiClient;
