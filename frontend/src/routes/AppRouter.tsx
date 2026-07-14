import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Analytics from "../pages/Analytics/Analytics";
import Pricing from "../pages/Pricing/Pricing";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";   
import Home from "../pages/Home/Home";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Dashboard />,
//     },
//     {
//         path: "/login",
//         element: <Login />,
//     },
//     {
//         path: "/register",
//         element: <Register />,
//     },
//     {
//         path: "/analytics",
//         element: <Analytics />,
//     },
//     {
//         path: "/pricing",
//         element: <Pricing />,
//     },
//     {
//         path: "/settings",
//         element: <Settings />,
//     },
//     {
//         path: "*",
//         element: <NotFound />,
//     },
// ]);



const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/analytics",
                element: <Analytics />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "/pricing",
                element: <Pricing />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;