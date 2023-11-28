import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import HomePage from "./components/pages/HomePage";
import CategoriesPage from "./components/pages/CategoriesPage";
import ProductPage from "./components/pages/ProductPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import ProfilePage from "./components/pages/ProfilePage";
import PolicyPage from "./components/pages/PolicyPage";
import ErrorPage from "./components/pages/ErrorPage";
import AdminHomePage from "./components/pages/AdminHomePage";
import AdminOrdersPage from "./components/pages/AdminOrdersPage";
import AdminStockPage from "./components/pages/AdminStockPage";
import AdminProductsPage from "./components/pages/AdminProductsPage";
import AdminCategoriesPage from "./components/pages/AdminCategoriesPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "categories/:title?", element: <CategoriesPage /> },
      { path: "products/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "policy", element: <PolicyPage /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "stock", element: <AdminStockPage /> },
      { path: "products", element: <AdminProductsPage /> },
      { path: "categories", element: <AdminCategoriesPage /> }
    ]
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> }
]);

export default router;
