import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/drivers", async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      distinct: ["id"],
    });
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar motoristas" });
  }
});

export default router;
