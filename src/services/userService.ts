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

const userService = {
  getLoggedInUser
};

export default userService;
