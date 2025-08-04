import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
  const location = useLocation();
  const [headerTitle, setHeaderTitle] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setHeaderTitle("Employee: Records");
        break;
      case "/create":
        setHeaderTitle("Account: Add Record");
        break;
      case "/update":
        setHeaderTitle("Account: Update Record");
        break;
      default:
        setHeaderTitle("");
    }
  }, [location.pathname]);

  return (
    <header className="bg-white border-b px-4 py-3 shadow-sm flex justify-between items-center w-full">
      <h1 className="text-lg font-semibold text-gray-800">{headerTitle}</h1>
      <Button variant="outline">Logout</Button>
    </header>
  );
}
