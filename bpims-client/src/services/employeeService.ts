import { api } from "@/lib/axios";
import { toast } from "sonner";

export const createEmployee = async (data: FormData) => {
  try {
    const res = await api.post(`api/employee`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("create success");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getEmployees = async ({
  page = 1,
  limit = "5",
  searchValue = "",
  searchKey = "name",
} = {}) => {
  console.log(import.meta.env.VITE_API_BASE_URL);
  const res = await api.get("/api/employee", {
    params: { page, limit, searchValue, searchKey },
  });
  return res.data;
};

export const getEmployeeById = async (id: number) => {
  try {
    const res = await api.get(`/api/employee/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const updateEmployee = async (id: number, data: FormData) => {
  try {
    const res = await api.put(`/api/employee/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Update success");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    const res = await api.delete(`/api/employee/${id}`);
    toast.success("delete success");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
