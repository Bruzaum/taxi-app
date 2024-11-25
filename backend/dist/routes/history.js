"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/ride/:customer_id", async (req, res) => {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    // Validação dos parâmetros
    if (!customer_id) {
        res.status(400).json({
            error_code: "MISSING_CUSTOMER_ID",
            error_description: "O parâmetro 'customer_id' é obrigatório.",
        });
        return;
    }
    const customerId = parseInt(customer_id, 10);
    const driverId = parseInt(driver_id, 10);
    if (isNaN(customerId) || isNaN(driverId)) {
        res.status(400).json({
            error_code: "INVALID_PARAMETERS",
            error_description: "Os parâmetros 'customer_id' e 'driver_id' devem ser números válidos.",
        });
        return;
    }
    try {
        // Verificar se o motorista existe
        const driver = await prisma.driver.findUnique({
            where: { id: driverId },
        });
        if (!driver) {
            res.status(404).json({
                error_code: "INVALID_DRIVER",
                error_description: "Motorista inválido.",
            });
            return;
        }
        // Buscar histórico de corridas
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
        if (rides.length === 0) {
            res.status(404).json({
                error_code: "NO_RIDES_FOUND",
                error_description: "Nenhum registro encontrado.",
            });
            return;
        }
        // Responder com os dados das corridas
        res.status(200).json({
            customer_id: customerId,
            rides,
        });
    }
    catch (error) {
        console.error("Erro ao buscar histórico de corridas:", error);
        res.status(500).json({
            error_code: "INTERNAL_SERVER_ERROR",
            error_description: "Erro ao recuperar o histórico de corridas.",
        });
    }
});
exports.default = router;
//# sourceMappingURL=history.js.map