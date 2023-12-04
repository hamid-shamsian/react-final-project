import { Outlet } from "react-router-dom";
import AdminMenu from "../widget/AdminMenu";

const AdminLayout = () => {
  return (
    <AdminMenu>
      <Outlet />
    </AdminMenu>
  );
};

export default AdminLayout;
