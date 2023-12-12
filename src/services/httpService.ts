import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import logService from "./logService";

const setToken = (jwt: string | null) => {
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

type CustomErrorHandling = (e: AxiosError) => Promise<any>;

let customErrorHandling: CustomErrorHandling;

const setCustomErrorHandling = (func: CustomErrorHandling) => (customErrorHandling = func);

const errorHandler = (error: AxiosError) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    logService.log(error);
    toast.error("خطای ناشناخته!");
  }

  try {
    return customErrorHandling(error);
  } catch (error) {
    return Promise.reject(error);
  }
};

axios.interceptors.response.use(null, errorHandler);

axios.defaults.withCredentials = true; // to be able to send cookies with the requests.

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  requestByConfig: axios,
  setToken,
  setCustomErrorHandling
};

export default http;
