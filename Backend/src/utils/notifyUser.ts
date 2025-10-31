import { PrismaClient } from "@prisma/client";
import { response, Request } from "express";

const prisma = new PrismaClient();

export const notifyUser = async (
  userId: string,
  message: string,
  type: string,
  referenceId?: string
) => {
  return prisma.notification.create({
    data: { userId, message, type, referenceId },
  });
};
