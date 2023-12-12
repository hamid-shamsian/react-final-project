import { redirect } from "react-router-dom";
import userService from "../services/userService";

// TODO: some protections dont work correctly due to authentication strategy changed (with cookies...) so change the route protection logic...
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
