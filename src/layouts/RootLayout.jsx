import { Navigate, Outlet, useLocation } from "react-router";
import MainNavBar from "../components/main-navbar/MainNavBar";

export default function RootLayout() {
  return (
    <>
      <MainNavBar />
      <div className=" bg-neutral-100 py-5 min-vh-100">
        <Outlet />
      </div>
    </>
  );
}
