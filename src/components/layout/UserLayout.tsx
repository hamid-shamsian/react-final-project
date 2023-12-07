import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserHeader from "../widget/UserHeader";
import UserFooter from "../widget/UserFooter";
import userService from "../../services/userService";
import { userActions } from "../../redux/features/userSlice";

export const userLoader = () => userService.getLoggedInUser();

const UserLayout = () => {
  const dispatch = useDispatch();
  const user = useLoaderData();

  useEffect(() => {
    dispatch(userActions.setUser(user));
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
