/* oxlint-disable react/only-export-components -- This module intentionally defines lazy route components. */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";

const Analytics = lazy(() => import("@/pages/Analytics/Analytics"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Home = lazy(() => import("@/pages/Home/Home"));
const Login = lazy(() => import("@/pages/Login/Login"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));
const Pricing = lazy(() => import("@/pages/Pricing/Pricing"));
const Register = lazy(() => import("@/pages/Register/Register"));
const Settings = lazy(() => import("@/pages/Settings/Settings"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pricing", element: <Pricing /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/analytics", element: <Analytics /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
