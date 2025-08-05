import axios from "axios";

export const createEmployee = async (data: FormData) => {
  const res = await axios.post(`api/employee`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
