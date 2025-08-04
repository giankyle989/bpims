import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
  const token = !localStorage.getItem("token");
  const location = useLocation();

  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === "/login") {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
