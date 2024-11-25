import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/ride-logs", async (req, res) => {
  try {
    const rideLogs = await prisma.rideLog.findMany({
      include: {
        customer: true,
        driver: true,
      },
    });
    res.json(rideLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar logs de corrida" });
  }
});

export default router;
