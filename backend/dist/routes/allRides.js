"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/ride-logs", async (req, res) => {
    try {
        const rideLogs = await prisma.rideLog.findMany({
            include: {
                customer: true,
                driver: true,
            },
        });
        res.json(rideLogs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar logs de corrida" });
    }
});
exports.default = router;
//# sourceMappingURL=allRides.js.map