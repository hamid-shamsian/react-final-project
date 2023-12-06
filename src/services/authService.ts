import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import http from "./httpService";
import config from "../../config.json";

const authEndpoint = config.API_BASE_URL + "/auth";
const tokenKey = "token";
let intervalID = 0;

const scheduleAccessTokenRenewal = () => (intervalID = setInterval(renewAccessToken, config.ACCESS_TOKEN_LIFETIME_SECONDS * 1000));

const renewAccessToken = async () => {
  try {
    const { data } = await http.post(authEndpoint + "/token", { refreshToken: getJWT() });
    http.setJWT(data.token.accessToken);
  } catch (er) {}
};

const login = async (username: string, password: string) => {
  try {
    const {
      data: { token, data }
    } = await http.post(authEndpoint + "/login", { username, password });

    localStorage.setItem(tokenKey, token.refreshToken);

    http.setJWT(token.accessToken);
    scheduleAccessTokenRenewal();

    return data.user;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      toast.error("نام‌کاربری یا کلمه‌عبور اشتباه است");
    }
  }
};

const logout = () => {
  localStorage.removeItem(tokenKey);
  clearInterval(intervalID);
};

interface TokenPayload {
  id: string;
  firstname: string;
  lastname: string;
  iat: number;
  exp: number;
}

const getDecodedToken = () => {
  try {
    return jwtDecode<TokenPayload>(getJWT());
  } catch (ex) {
    return null;
  }
};

const getStoredUser = () => {
  const decodedToken = getDecodedToken();
  if (decodedToken) {
    const { id, firstname, lastname } = decodedToken;
    return { id, firstname, lastname };
  }
  return null;
};

const getJWT = () => {
  return localStorage.getItem(tokenKey) ?? "";
};

// ===============================================================================================

const storedTokenExp = getDecodedToken()?.exp ?? 0;

if (storedTokenExp > Date.now() / 1000) {
  renewAccessToken();
  scheduleAccessTokenRenewal();
} else {
  logout(); // to remove expired refresh token from localstorage.
}

const auth = {
  login,
  logout,
  getStoredUser
};

export default auth;
