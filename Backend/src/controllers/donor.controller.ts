import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createDonation = async (req: Request, res: Response) => {
  const { title, description, category, quantity, donorId } = req.body;

  if (!title || !description || !category || !quantity || !donorId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const donation = await prisma.donation.create({
      data: {
        title,
        description,
        category,
        quantity,
        donor: {
          connect: {
            id: donorId,
          },
        },
      },
    });

    res.status(201).json({
      message: "Donation created successfully",
      donation,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      error: "Can't create donation",
    });
  }
};

export const AllDonation = async (req: Request, res: Response) => {
  try {
    const data = await prisma.donation.findMany({
      where: {
        status: "AVAILABLE",
      },
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
    if (data.length === 0) {
      return res.status(404).json({
        message: "No available donation found",
      });
    }
    res.status(201).json({
      message: "All donations",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      message: "Something went wrong",
    });
  }
};

export const getDonationbyId = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await prisma.donation.findUnique({
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

    if (!data) {
      return res.status(501).json({
        message: "Create a donation!",
      });
    }

    res.status(201).json({
      message: "Your donation request",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      message: "Data not found!",
    });
  }
};

export const updateDonation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["AVAILABLE", "CLAIMED", "DELIVERED"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status!",
    });
  }

  try {
    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found!",
      });
    }

    const updatedData = await prisma.donation.update({
      where: { id },
      data: { status },
      include: {
        donor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Status updated successfully",
      updatedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteDonation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { donorId } = req.body; // extract donorId from request

  try {
    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Authorization check
    if (donation.donorId !== donorId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this donation" });
    }

    await prisma.donation.delete({ where: { id } });

    return res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllDonationByLoggedInUser = async (
  req: Request,
  res: Response
) => {
  const { donorId } = req.params;

  if (!donorId) {
    return res.status(400).json({
      message: "Donor ID is required",
    });
  }

  try {
    const donations = await prisma.donation.findMany({
      where: {
        donorId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        title: true,
        description: true,
        category: true,
        quantity: true,
        status: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: "Donations fetched successfully",
      donations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
