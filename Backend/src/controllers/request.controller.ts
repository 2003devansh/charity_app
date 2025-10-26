import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createRequest = async (req: Request, res: Response) => {
  const { title, description, category, recipientId } = req.body;

  if (!title || !description || !category || !recipientId) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const data = await prisma.request.create({
      data: {
        title,
        description,
        category,
        recipient: {
          connect: {
            id: recipientId,
          },
        },
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Cant create request",
      });
    }

    return res.status(201).json({
      message: "Request created succesfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      message: "Somethinng went wrong",
    });
  }
};

export const getMyRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.request.findMany({
      where: { status: "OPEN" },
      include: {
        recipient: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    if (requests.length === 0) {
      return res.status(404).json({
        message: "Request box is empty",
      });
    }

    res.status(200).json({
      message: "Requests retrieved successfully",
      requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await prisma.request.findUnique({
      where: { id },
      include: {
        recipient: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Cant find requests",
      });
    }

    return res.status(201).json({
      message: "Request fetched succesfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      message: "Something went wrong",
    });
  }
};

export const updateRequest = async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const data = await prisma.request.update({
      where: { id },
      data: {
        status: "FULFILLED",
      },
      include: {
        recipient: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Status changed succesfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      message: "Something went wrong",
    });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  const { id } = req.params; // request id from URL
  const { recipientId } = req.body; // recipient id from body

  try {
    const request = await prisma.request.findUnique({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.recipientId !== recipientId) {
      return res.status(403).json({
        message: "You are not authorized to delete this request",
      });
    }

    await prisma.request.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Request deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong while deleting request",
    });
  }
};
