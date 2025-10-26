import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const createNotification = async (req: Request, res: Response) => {
  const { userId, message, type, referenceId } = req.body;

  if (!userId || !message) {
    return res.status(400).json({
      message: "userId and message are required",
    });
  }

  try {
    const data = await prisma.notification.create({
      data: { userId, message, type, referenceId },
    });

    return res.status(201).json({
      message: "Notification created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while creating notification",
    });
  }
};

export const getUserNotification = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (notifications.length === 0) {
      return res.status(404).json({
        message: "No notifications found",
      });
    }

    return res.status(200).json({
      message: "Notifications retrieved successfully",
      notifications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching notifications",
    });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedData = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return res.status(200).json({
      message: "Notification marked as read",
      updatedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while marking as read",
    });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedNotification = await prisma.notification.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Notification deleted successfully",
      deletedNotification,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while deleting notification",
    });
  }
};

export const clearAllnotifications = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const data = await prisma.notification.deleteMany({
      where: { userId },
    });

    return res.status(200).json({
      message: "All notifications cleared",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while clearing notifications",
    });
  }
};
