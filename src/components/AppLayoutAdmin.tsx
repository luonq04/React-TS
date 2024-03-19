import React from "react";
import "@/index.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayoutAdmin = () => {
  return (
    <div className="bg-white flex min-h-screen">
      <Sidebar />

      <div className="p-8 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayoutAdmin;
