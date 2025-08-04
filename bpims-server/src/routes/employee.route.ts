import express from "express";
import multer from "multer";
import { createEmployee } from "../controllers/employee.controller";

const router = express.Router();

const upload = multer();

router.post("/", upload.single("photo"), createEmployee);

export default router;
