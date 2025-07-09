// src/layout/AdminLayout.jsx
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const AdminLayout = () => {
  const { checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

 return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 transition-all">
        <Outlet />
      </main>
    </div>
  )
};
