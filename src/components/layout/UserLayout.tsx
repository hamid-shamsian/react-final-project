import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserHeader from "../widget/UserHeader";
import UserFooter from "../widget/UserFooter";
import { userActions } from "../../redux/features/userSlice";
import userService from "../../services/userService";

const UserLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const user = await userService.getLoggedInUser();
        dispatch(userActions.setUser(user));
      } catch (error) {}
    })();
  }, []);

  return (
    <>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </>
  );
};

export default UserLayout;
