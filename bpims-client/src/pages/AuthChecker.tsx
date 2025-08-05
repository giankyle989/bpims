import { getCurrentUser } from "@/services/authService";
import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthChecker({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const check = async () => {
    try {
      await getCurrentUser();
      setIsAuth(true);
    } catch {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, [navigate]);

  if (loading) return <div className="p-4">Checking authentication...</div>;
  if (!isAuth) return null;

  return children;
}
