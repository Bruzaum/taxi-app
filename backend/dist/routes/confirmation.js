"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.patch("/ride/confirmation", async (req, res) => {
    try {
        const { driver_id, value } = req.body;
        // Validação de entrada
        if (!driver_id || !value) {
            res.status(400).json({
                error_code: "INVALID_REQUEST",
                error_description: "driver_id e value são obrigatórios",
            });
            return;
        }
        // Recupera o último registro na tabela RideRequest
        const lastRideRequest = await prisma.rideRequest.findFirst({
            orderBy: {
                id: "desc",
            },
        });
        if (!lastRideRequest) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Nenhum registro de estimativa encontrado",
            });
            return;
        }
        if (!lastRideRequest.customer_id) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "ID do usuário não informado",
            });
            return;
        }
        if (lastRideRequest.originAdress === lastRideRequest.destinationAdress) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Endereço de Origem e Destino não podem ser iguais",
            });
            return;
        }
        // Busca o motorista pelo ID fornecido
        const driver = await prisma.driver.findUnique({
            where: { id: driver_id },
        });
        if (!driver) {
            res.status(404).json({
                error_code: "DRIVER_NOT_FOUND",
                error_description: `Nenhum Driver encontrado com o ID ${driver_id}.`,
            });
            return;
        }
        // Verifica a quilometragem mínima
        if (lastRideRequest.distance * value < driver.km_min) {
            res.status(406).json({
                error_code: "INVALID_DISTANCE",
                error_description: "Quilometragem inválida para o motorista",
            });
            return;
        }
        // Cria o registro na tabela RideLog
        const newRideLog = await prisma.rideLog.create({
            data: {
                customer_id: lastRideRequest.customer_id,
                originLat: lastRideRequest.originLat,
                originLng: lastRideRequest.originLng,
                originAdress: lastRideRequest.originAdress,
                destinationLat: lastRideRequest.destinationLat,
                destinationLng: lastRideRequest.destinationLng,
                destinationAdress: lastRideRequest.destinationAdress,
                distance: lastRideRequest.distance,
                duration: lastRideRequest.duration,
                value: lastRideRequest.distance * value,
                driverId: driver.id,
            },
        });
        res.status(200).json({
            success: true,
            rideLog: newRideLog,
        });
    }
    catch (error) {
        console.error("Error creating ride log from last ride request:", error);
        res.status(500).json({
            error_code: "INTERNAL_SERVER_ERROR",
            error_description: "Erro ao criar o registro da viagem a partir do último registro.",
        });
    }
});
exports.default = router;
//# sourceMappingURL=confirmation.js.map