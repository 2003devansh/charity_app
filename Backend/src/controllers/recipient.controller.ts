import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAvailableDonation = async (req: Request, res: Response) => {
  try {
    const data = await prisma.donation.findMany({
      where: {
        status: "AVAILABLE",
      },
      include: {
        donor: {
          select: {
            name: true,
            location: true,
            createdAt: true,
          },
        },
      },
    });

    if (data.length === 0) {
      return res.status(404).json({
        message: "Not available donation...",
      });
    }

    return res.status(201).json({
      message: "Available donation",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      message: "Something went wrong!",
    });
  }
};

export const claimDonation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { recipientId } = req.body;

  if (!recipientId) {
    return res.status(501).json({
      message: "Receipent ID is required",
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

    if (donation.status !== "AVAILABLE") {
      return res.status(400).json({
        message: "Donation is not authorize to claim",
      });
    }

    const updatedDonation = await prisma.donation.update({
      where: { id },
      data: { status: "CLAIMED", recipient: { connect: { id: recipientId } } },
      include: {
        donor: { select: { id: true, name: true, location: true } },
        recipient: { select: { id: true, name: true, location: true } },
      },
    });

    return res.status(200).json({
      message: "Donation claimed successfully",
      donation: updatedDonation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMydonation = async (req: Request, res: Response) => {
  const { recipientId } = req.params;

  if (!recipientId) {
    return res.status(400).json({
      message: "Receipent ID is required",
    });
  }

  try {
    const donations = await prisma.donation.findMany({
      where: { recipientId },
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

    if (donations.length === 0) {
      return res.status(404).json({
        message: "No claimed donations found",
      });
    }

    return res.status(200).json({
      message: "Claimed donations retrieved successfully",
      donations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
