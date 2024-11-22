import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get(
  "/ride/:customer_id",
  async (req: Request, res: Response): Promise<void> => {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    // Verificar se o customer_id está presente
    if (!customer_id) {
      res.status(400).json({
        error_code: "MISSING_CUSTOMER_ID",
        error_description: "O parâmetro 'customer_id' é obrigatório.",
      });
      return;
    }

    // Validação dos parâmetros
    const customerId = parseInt(customer_id, 10);
    const driverId = parseInt(driver_id as string, 10);

    if (isNaN(customerId) || isNaN(driverId)) {
      res.status(400).json({
        error_code: "INVALID_PARAMETERS",
        error_description:
          "Os parâmetros customer_id e driver_id devem ser números válidos.",
      });
      return;
    }

    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
    });

    // Motorista não encontrado
    if (!driver) {
      res.status(404).json({
        error_code: "INVALID_DRIVER",
        error_description: "Motorista invalido",
      });
      return;
    }

    if (isNaN(customerId)) {
      res.status(400).json({
        error_code: "NO_CUSTOMER_FOUND",
        error_description: "O ID do usuário deve ser inserido",
      });
      return;
    }

    try {
      // Consulta no banco de dados para encontrar todas as corridas
      const rides = await prisma.rideLog.findMany({
        where: {
          customer_id: customerId,
          driverId: driverId,
        },
        select: {
          id: true,
          originAdress: true,
          destinationAdress: true,
          distance: true,
          duration: true,
          value: true,
          createdAt: true,
        },
        orderBy: {
          id: "desc",
        },
      });

      // Retorno vazio caso não existam corridas
      if (rides.length === 0) {
        res.status(404).json({
          error_code: "NO_RIDES_FOUND",
          error_description: "Nenhum registro encontrado",
        });
        return;
      }

      // Resposta formatada com os dados do customer_id e do histórico de corridas
      res.status(200).json({
        customer_id: customerId,
        rides,
      });
    } catch (error) {
      console.error("Erro ao buscar histórico de corridas:", error);
      res.status(500).json({
        error_code: "INTERNAL_SERVER_ERROR",
        error_description: "Erro ao recuperar o histórico de corridas.",
      });
    }
  }
);

export default router;
