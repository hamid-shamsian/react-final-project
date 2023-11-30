import { Outlet } from "react-router-dom";
import UserHeader from "../widget/UserHeader";
import UserFooter from "../widget/UserFooter";

const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </>
  );
};

export default UserLayout;
