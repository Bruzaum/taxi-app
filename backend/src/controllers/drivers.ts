import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sortedDrivers = async () => {
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: {
        value: "asc",
      },
    });
    return drivers;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
};
