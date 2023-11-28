import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <header>some user header....</header>
      <Outlet />
    </>
  );
};

export default UserLayout;
