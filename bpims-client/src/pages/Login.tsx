import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async () => {
    try {
      await login({ username, password });
      setTimeout(() => navigate("/dashboard"), 100);
    } catch (err: any) {
      setError(err.response?.data?.message || "login failed");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="mb-2"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4"
      />
      <Button onClick={loginSubmit} className="w-full">
        Login
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
