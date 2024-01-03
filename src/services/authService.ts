import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import apiClient, { authUtils } from "./apiClient";

const authEndpoint = "/auth";
let token = "";

const renewAccessToken = async () => {
  try {
    const { data } = await apiClient.get(authEndpoint + "/token");
    token = data.token.accessToken;
    authUtils.setToken(token);
    return token; // for possible further uses... (sometimes it is used.)
  } catch (er) {
    return Promise.reject(er);
  }
};

const login = async (username: string, password: string) => {
  try {
    const { data } = await apiClient.post(authEndpoint + "/login", { username, password });

    token = data.token.accessToken;
    authUtils.setToken(token);

    return data.data.user;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      toast.error("نام‌کاربری یا کلمه‌عبور اشتباه است");
    }
  }
};

const logout = async () => {
  try {
    await apiClient.get(authEndpoint + "/logout");
    token = "";
    authUtils.setToken(null);
  } catch (error) {}
};

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const getDecodedToken = () => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (ex) {
    return null;
  }
};

const getLoggedInUserId = () => getDecodedToken()?.id ?? null;

let isRefreshingToken = false;

const refreshingAccessTokenHandler = async (error: AxiosError) => {
  if (error.response?.status === 401 && !isRefreshingToken) {
    isRefreshingToken = true; // Set flag to indicate token refresh attempt executed once. (to prevent from infinite 401 loop...)

    // return new Promise(async (resolve, reject) => {
    try {
      const token = await renewAccessToken();
      if (error.config) {
        // if statement is only for satisfying typescript :)
        error.config.headers["Authorization"] = "Bearer " + token; // put the new accessToken to the previous request which was failed because of expired accessToken. (in fact: setting the new accessToken in the default headers of axios by renewAccessToken (and setToken...) function will not set that for the previous failed request config object.)
        return apiClient(error.config); // resolve(apiClient(error.config));
      }
    } catch (refreshingError) {
      throw refreshingError; // reject(refreshingError);
    } finally {
      isRefreshingToken = false;
    }
    // });
  }
};

// ===============================================================================================

authUtils.setCustomErrorHandling(refreshingAccessTokenHandler);

(async () => {
  try {
    await renewAccessToken();
  } catch (error) {}
})();

// ===============================================================================================

const authService = {
  login,
  logout,
  getLoggedInUserId
};

export default authService;
