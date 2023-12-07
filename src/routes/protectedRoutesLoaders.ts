import { redirect } from "react-router-dom";
import authService from "../services/authService";

const fromNoneLoggedInUsers = () => {
  const user = authService.getStoredUser();
  if (!user) return redirect("/login");
  return null;
};

const fromLoggedInUsers = () => {
  const user = authService.getStoredUser();
  if (user) return redirect("/");
  return null;
};

const fromNoneAdminUsers = () => {
  const user = authService.getStoredUser();
  if (user?.role !== "ADMIN") return redirect("/login");
  return null;
};

const protectRoute = {
  fromNoneLoggedInUsers,
  fromLoggedInUsers,
  fromNoneAdminUsers
};

export default protectRoute;
