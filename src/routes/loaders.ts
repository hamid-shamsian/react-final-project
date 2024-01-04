import { redirect } from "react-router-dom";
import store from "../redux/store";
import { getLoggedInUser } from "../redux/features/auth/authThunks";
import userService from "../services/userService";

export const userLoader = () => {
  store.dispatch(getLoggedInUser());
  return null;
};

const fromNoneLoggedInUsers = async () => {
  const user = await userService.getLoggedInUser();
  if (!user) return redirect("/login");
  return null;
};

const fromLoggedInUsers = async () => {
  const user = await userService.getLoggedInUser();
  if (user) return redirect("/");
  return null;
};

const fromNoneAdminUsers = async () => {
  const user = await userService.getLoggedInUser();
  if (user?.role !== "ADMIN") return redirect("/login");
  return null;
};

const protectRoute = {
  fromNoneLoggedInUsers,
  fromLoggedInUsers,
  fromNoneAdminUsers
};

export default protectRoute;
