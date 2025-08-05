import express from "express";
import multer from "multer";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.controller";

const router = express.Router();

const upload = multer();
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", upload.single("photo"), createEmployee);
router.put("/:id", upload.single("photo"), updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
