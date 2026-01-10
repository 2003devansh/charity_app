import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

/**
 * ----------------------------------------
 * CREATE REQUEST (AUTH REQUIRED)
 * POST /requests
 * ----------------------------------------
 */
export const createRequest = async (req: Request, res: Response) => {
  const { title, description, category, quantity } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!title || !description || !category) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const request = await prisma.request.create({
      data: {
        title,
        description,
        category,
        recipientId: req.user.id,
        status: "OPEN",
      },
    });

    return res.status(201).json({
      message: "Request created successfully",
      request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create request",
    });
  }
};

/**
 * ----------------------------------------
 * GET LOGGED-IN USER REQUESTS
 * GET /requests/myrequests
 * ----------------------------------------
 */
export const getMyRequests = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const requests = await prisma.request.findMany({
      where: {
        recipientId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

/**
 * ----------------------------------------
 * GET REQUEST BY ID (PUBLIC)
 * GET /requests/:id
 * ----------------------------------------
 */
export const getRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const request = await prisma.request.findUnique({
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

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    return res.status(200).json({
      request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

/**
 * ----------------------------------------
 * UPDATE REQUEST STATUS (OWNER ONLY)
 * PATCH /requests/:id
 * ----------------------------------------
 */
export const updateRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!["OPEN", "FULFILLED", "CANCELLED"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  try {
    const request = await prisma.request.findUnique({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.recipientId !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      message: "Request updated successfully",
      updatedRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

/**
 * ----------------------------------------
 * DELETE REQUEST (OWNER ONLY)
 * DELETE /requests/:id
 * ----------------------------------------
 */
export const deleteRequest = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const request = await prisma.request.findUnique({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.recipientId !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
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
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
