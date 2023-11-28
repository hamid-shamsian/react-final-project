import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <header>some admin header....</header>
      <Outlet />
    </>
  );
};

export default AdminLayout;
