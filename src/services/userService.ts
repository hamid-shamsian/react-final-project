import apiClient from "./apiClient";
import authService from "./authService";

const userEndpoint = "/users";

const getUserById = (id: string) => apiClient.get(userEndpoint + "/" + id);

const editById = ({ id, user }: any) => apiClient.patch(`${userEndpoint}/${id}`, user).then(res => res.data);

const getLoggedInUser = async () => {
  const userId = await authService.getLoggedInUserId();

  if (userId) {
    const { data } = await getUserById(userId);
    return data.data.user;
  }

  return null;
};

const userService = {
  getUserById,
  editById,
  getLoggedInUser
};

export default userService;
