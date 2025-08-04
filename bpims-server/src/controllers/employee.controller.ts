// controllers/employeeController.ts
import { Request, Response } from "express";
import Employee from "../models/employee.model";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      country,
      accountType,
      username,
      lastName,
      firstName,
      email,
      contactNumber,
    } = req.body;

    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("Received file:", req.file);
    return;
    const newEmployee = await Employee.create({
      country,
      accountType,
      username,
      lastName,
      firstName,
      email,
      contactNumber,
      photo,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Failed to create employee" });
  }
};
