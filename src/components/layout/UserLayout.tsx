import { Outlet, useLoaderData } from "react-router-dom";
import UserHeader from "../widget/UserHeader";
import UserFooter from "../widget/UserFooter";
import userService from "../../services/userService";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/features/authSlice";
import { useEffect } from "react";

export const userLoader = () => userService.getLoggedInUser();

const UserLayout = () => {
  const dispatch = useDispatch();
  const user = useLoaderData();

  useEffect(() => {
    dispatch(authActions.setUser(user));
  }, [user]);

  return (
    <>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </>
  );
};

export default UserLayout;
