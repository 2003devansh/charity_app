import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAvailableTask = async (req: Request, res: Response) => {
  try {
    const data = await prisma.donation.findMany({
      where: {
        status: "CLAIMED",
      },
      include: {
        donor: {
          select: { id: true, name: true, email: true, location: true },
        },
        recipient: {
          select: { id: true, name: true, email: true, location: true },
        },
      },
    });

    if (data.length === 0) {
      return res.status(404).json({
        message: "No available tasks found",
      });
    }

    return res.status(200).json({
      message: "Available tasks fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const acceptTask = async (req: Request, res: Response) => {
  const { donationId, volunteerId } = req.body;

  if (!donationId || !volunteerId) {
    return res.status(400).json({
      message: "Donation ID and Volunteer ID are required",
    });
  }

  try {
    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.status !== "CLAIMED") {
      return res.status(400).json({
        message: "Donation is not in CLAIMED status",
      });
    }

    const task = await prisma.volunteerTask.create({
      data: {
        donationId,
        volunteerId,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      message: "Volunteer task accepted successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getMyTask = async (req: Request, res: Response) => {
  const { volunteerId } = req.body;

  if (!volunteerId) {
    return res.status(400).json({
      message: "Volunteer ID is required",
    });
  }

  try {
    const tasks = await prisma.volunteerTask.findMany({
      where: { volunteerId },
      include: {
        donation: {
          select: {
            id: true,
            title: true,
            category: true,
            status: true,
            donor: {
              select: { id: true, name: true, location: true },
            },
            recipient: {
              select: { id: true, name: true, location: true },
            },
          },
        },
      },
    });

    if (tasks.length === 0) {
      return res.status(404).json({
        message: "No tasks found for this volunteer",
      });
    }

    return res.status(200).json({
      message: "Volunteer tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!["PENDING", "COMPLETED"].includes(status)) {
    return res.status(400).json({
      message: "Invalid task status. Must be PENDING or COMPLETED.",
    });
  }

  try {
    const task = await prisma.volunteerTask.findUnique({
      where: { id: taskId },
      include: { donation: true },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.volunteerTask.update({
      where: { id: taskId },
      data: { status },
      include: {
        volunteer: { select: { id: true, name: true } },
        donation: {
          select: {
            id: true,
            title: true,
            status: true,
            donor: { select: { id: true, name: true } },
            recipient: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (status === "COMPLETED") {
      await prisma.donation.update({
        where: { id: task.donationId },
        data: { status: "DELIVERED" },
      });
    }

    return res.status(200).json({
      message: "Task status updated successfully",
      updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while updating task status",
    });
  }
};
