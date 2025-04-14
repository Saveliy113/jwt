import React from "react";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
    return (
        <div className="bg-slate-100 w-full h-full">
            <div className="container h-full m-auto p-0.5 bg-white rounded-4xl">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout;