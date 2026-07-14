import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <>
            <h2>Auth Layout</h2>

            <Outlet />
        </>
    );
}