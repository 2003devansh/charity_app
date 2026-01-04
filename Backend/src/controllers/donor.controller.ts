import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// CREATE DONATION
export const createDonation = async (req: Request, res: Response) => {
  const { title, description, category, quantity } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!title || !description || !category || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const donation = await prisma.donation.create({
      data: {
        title,
        description,
        category,
        quantity,
        donorId: req.user.id,
      },
    });

    return res.status(201).json({
      message: "Donation created successfully",
      donation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create donation",
    });
  }
};

// GET ALL AVAILABLE DONATIONS

export const getAllAvailableDonations = async (req: Request, res: Response) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { status: "AVAILABLE" },
      include: {
        donor: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Available donations fetched",
      donations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// GET DONATION BY ID (public)

export const getDonationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        donor: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    return res.status(200).json({
      donation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// UPDATE DONATION STATUS (owner only)

export const updateDonationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!["AVAILABLE", "CLAIMED", "DELIVERED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const donation = await prisma.donation.findUnique({ where: { id } });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.donorId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedDonation = await prisma.donation.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      message: "Donation status updated",
      updatedDonation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// DELETE DONATION

export const deleteDonation = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const donation = await prisma.donation.findUnique({ where: { id } });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.donorId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.donation.delete({ where: { id } });

    return res.status(200).json({
      message: "Donation deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// GET LOGGED-IN USER DONATIONS
export const getMyDonations = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const donations = await prisma.donation.findMany({
      where: {
        donorId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      donations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
