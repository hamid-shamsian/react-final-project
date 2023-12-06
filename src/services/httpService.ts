import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import logService from "./logService";

axios.interceptors.response.use(null, (error: AxiosError) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    logService.log(error);
    toast.error("خطای ناشناخته!");
  }

  return Promise.reject(error);
});

const setJWT = (jwt: string | null) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
};

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJWT
};

export default http;
