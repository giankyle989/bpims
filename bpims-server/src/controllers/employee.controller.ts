import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { uploadImageToS3 } from "src/utils/uploadImageToS3";

const prisma = new PrismaClient();

export const getEmployees = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || "5";
  const searchValue = (req.query.searchValue as string) || "";
  const searchKey = (req.query.searchKey as string) || "username";

  const skip = (page - 1) * Number(limit);

  try {
    const where: any = {
      deletedAt: null,
    };

    if (searchValue && ["username", "email"].includes(searchKey)) {
      where[searchKey] = { contains: searchValue };
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { id: "desc" },
      }),
      prisma.employee.count({ where }),
    ]);

    res.status(200).json({
      data: employees,
      total,
      page,
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "failed to fetch employees" });
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

    let photoKey: string | null = null;

    if (req.file) {
      photoKey = await uploadImageToS3(req.file);
    }

    const newEmployee = await prisma.employee.create({
      data: {
        country,
        accountType,
        username,
        lastName,
        firstName,
        email,
        contactNumber,
        photo: photoKey,
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

    let photoKey: string | null = null;

    if (req.file) {
      photoKey = await uploadImageToS3(req.file);
    }

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
        ...(photoKey && { photo: photoKey }),
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
