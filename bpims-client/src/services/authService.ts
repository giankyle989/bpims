import { api } from "@/lib/axios";

export const getCurrentUser = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};

export const login = async (data: { username: string; password: string }) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};
