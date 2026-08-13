import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Signin from "../pages/auth/signin/Signin";
import Signup from "../pages/auth/signup/Signup";
import ChangePasswordPage from "../components/change-passowrd/ChangePassword";
import Settings from "../pages/auth/settings/Settings";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";
import UserCart from "../pages/cart/UserCart";
import ForgetPassword from "../pages/auth/forget-password/ForgetPassword";
import VerifyResetCode from "../pages/auth/verify-reset-code/VerifyResetCode";
import ResetPassword from "../pages/auth/reset-password/ResetPassword";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="products" replace /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/settings", element: <Settings /> },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
      { path: "/verify-reset-code", element: <VerifyResetCode /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/cart", element: <UserCart /> },
    ],
  },
]);
