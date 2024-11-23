"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortedDrivers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const sortedDrivers = async () => {
    try {
        const drivers = await prisma.driver.findMany({
            orderBy: {
                value: "asc",
            },
        });
        return drivers;
    }
    catch (error) {
        console.error("Error fetching drivers:", error);
        return [];
    }
};
exports.sortedDrivers = sortedDrivers;
//# sourceMappingURL=drivers.js.map