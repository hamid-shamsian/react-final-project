import http from "./httpService";
import config from "../../config.json";
import authService from "./authService";

const userEndpoint = config.API_BASE_URL + "/users";

const getLoggedInUser = async () => {
  const userId = authService.getStoredUser()?.id;
  if (userId) {
    try {
      const { data } = await http.get(userEndpoint + "/" + userId);
      return data.data.user;
    } catch (error) {}
  }
  return null;
};

const getUserById = (id: string) => http.get(userEndpoint + "/" + id);

const userService = {
  getLoggedInUser,
  getUserById
};

export default userService;
