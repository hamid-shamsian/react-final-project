import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";
import apiClient, { authUtils } from "./apiClient";

const authEndpointBase = "/auth";
const loginEndpoint = "/login";
let token = "";

const renewAccessToken = async () => {
  try {
    const { data } = await apiClient.get(authEndpointBase + "/token");
    token = data.token.accessToken;
    authUtils.setToken(token);
    return token; // for possible further uses... (sometimes it is used.)
  } catch (er) {
    return Promise.reject(er);
  }
};

const login = async (credentials: { username: string; password: string }) => {
  const { data } = await apiClient.post(authEndpointBase + loginEndpoint, credentials);

  token = data?.token.accessToken;
  if (token) authUtils.setToken(token);

  return data.data.user;
};

const logout = async () => {
  const { data } = await apiClient.get(authEndpointBase + "/logout");

  token = "";
  authUtils.setToken(null);

  return data;
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

const getLoggedInUserId = async () => {
  try {
    await renewAccessToken();
  } catch (error) {}

  return token ? getDecodedToken()?.id : null;
};

let isRefreshingToken = false;

const refreshingAccessTokenHandler = async (error: AxiosError) => {
  if (error.response?.status === 401 && !error.config?.url?.endsWith(loginEndpoint) && !isRefreshingToken) {
    isRefreshingToken = true; // Set flag to indicate token refresh attempt executed once. (to prevent from infinite 401 loop...)

    try {
      const token = await renewAccessToken();
      if (error.config) {
        // if statement is only for satisfying typescript :)
        error.config.headers["Authorization"] = "Bearer " + token;
        return apiClient(error.config);
      }
    } catch (refreshingError) {
      throw refreshingError;
    } finally {
      isRefreshingToken = false;
    }
  }
};

authUtils.setCustomErrorHandling(refreshingAccessTokenHandler);

const authService = {
  login,
  logout,
  getLoggedInUserId
};

export default authService;
