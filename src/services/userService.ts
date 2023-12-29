import http from "./httpService";
import authService from "./authService";
import config from "../../config.json";

const userEndpoint = config.API_BASE_URL + "/users";

const getUserById = (id: string) => http.get(userEndpoint + "/" + id);

const editById = ({ id, user }: any) => http.patch(`${userEndpoint}/${id}`, user).then(res => res.data);

const getLoggedInUser = async () => {
  const userId = authService.getLoggedInUserId();

  if (userId) {
    try {
      const { data } = await getUserById(userId);
      return data.data.user;
    } catch (error) {}
  }
  return null;
};

const userService = {
  getUserById,
  editById,
  getLoggedInUser
};

export default userService;
