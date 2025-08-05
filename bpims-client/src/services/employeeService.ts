import axios from "axios";
import { toast } from "sonner";

export const createEmployee = async (data: FormData) => {
  try {
    const res = await axios.post(`api/employee`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("create success");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getEmployees = async () => {
  try {
    const res = await axios.get("/api/employee");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getEmployeeById = async (id: number) => {
  try {
    const res = await axios.get(`/api/employee/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const updateEmployee = async (id: number, data: FormData) => {
  try {
    const res = await axios.put(`/api/employee/${id}`, data, {
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
    const res = await axios.delete(`/api/employee/${id}`);
    toast.success("delete success");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
