import { createBrowserRouter } from "react-router-dom";
import { lazyImport } from "../utils/utilityFuncs";
import UserLayout from "../components/layout/UserLayout";
import HomePage from "../pages/HomePage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentPage from "../pages/PaymentPage";
import ProfilePage from "../pages/ProfilePage";
import PolicyPage from "../pages/PolicyPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import AdminPagesLoading from "../pages/admin/AdminPagesLoading";
import Suspended from "../components/common/Suspended";
import protectRoute, { userLoader } from "./loaders";

// Lazy Imports: note that the addresses must be relative to the utilityFuncs module.
const AdminLayout = lazyImport("../components/layout/AdminLayout");
const AdminHomePage = lazyImport("../pages/admin/AdminHomePage");
const AdminOrdersPage = lazyImport("../pages/admin/AdminOrdersPage");
const AdminStockPage = lazyImport("../pages/admin/AdminStockPage");
const AdminProductsPage = lazyImport("../pages/admin/AdminProductsPage");
const AdminCategoriesPage = lazyImport("../pages/admin/AdminCategoriesPage");

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    loader: userLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "categories/:cat?/:subCat?", element: <CategoriesPage /> },
      { path: "products/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "profile", element: <ProfilePage />, loader: protectRoute.fromNoneLoggedInUsers },
      { path: "policy", element: <PolicyPage /> },
      { path: "logout", element: <LogoutPage /> }
    ]
  },
  {
    path: "/admin",
    element: <Suspended comp={AdminLayout} load={() => <AdminPagesLoading wholePage={true} />} />,
    loader: protectRoute.fromNoneAdminUsers,
    children: [
      { index: true, element: <Suspended comp={AdminHomePage} load={AdminPagesLoading} /> },
      { path: "orders", element: <Suspended comp={AdminOrdersPage} load={AdminPagesLoading} /> },
      { path: "stock", element: <Suspended comp={AdminStockPage} load={AdminPagesLoading} /> },
      { path: "products", element: <Suspended comp={AdminProductsPage} load={AdminPagesLoading} /> },
      { path: "categories", element: <Suspended comp={AdminCategoriesPage} load={AdminPagesLoading} /> }
    ]
  },
  { path: "/login", element: <LoginPage />, loader: protectRoute.fromLoggedInUsers },
  { path: "/signup", element: <SignupPage />, loader: protectRoute.fromLoggedInUsers }
]);

export default router;
