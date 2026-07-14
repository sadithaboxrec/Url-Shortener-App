import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <h2>Main Layout</h2>

            <Outlet />
        </>
    );
}