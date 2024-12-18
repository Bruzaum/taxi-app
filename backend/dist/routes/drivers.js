"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/drivers", async (req, res) => {
    try {
        const drivers = await prisma.driver.findMany({
            distinct: ["id"],
        });
        res.json(drivers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar motoristas" });
    }
});
exports.default = router;
//# sourceMappingURL=drivers.js.map