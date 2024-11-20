"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drivers_1 = __importDefault(require("./routes/drivers"));
const customers_1 = __importDefault(require("./routes/customers"));
const googleRoutes_1 = __importDefault(require("./routes/googleRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use("/api", drivers_1.default);
app.use("/api", customers_1.default);
app.use("/api", googleRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
