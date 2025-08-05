import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        deletedAt: null,
      },
    });
    res.status(200).json(employees);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.message || "failed to fetch employees" });
  }
};
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!employee) {
      return res.status(404).json({ message: "employee not found" });
    }

    res.status(200).json(employee);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.message || "failed to get employee" });
  }
};

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

    const newEmployee = await prisma.employee.create({
      data: {
        country,
        accountType,
        username,
        lastName,
        firstName,
        email,
        contactNumber,
        photo,
      },
    });

    res.status(201).json(newEmployee);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: `The ${error.meta?.target} already exists.`,
      });
    }
    res
      .status(500)
      .json({ message: error?.message || "failed to create employee" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      country,
      accountType,
      username,
      lastName,
      firstName,
      email,
      contactNumber,
    } = req.body;

    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        country,
        accountType,
        username,
        lastName,
        firstName,
        email,
        contactNumber,
        ...(photo && { photo }),
      },
    });

    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.message || "failed to update employee" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.employee.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    res.status(200).json({ message: "deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error?.message || "failed to delete" });
  }
};
