"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleRoutes_1 = __importDefault(require("./routes/googleRoutes"));
const confirmation_1 = __importDefault(require("./routes/confirmation"));
const history_1 = __importDefault(require("./routes/history"));
const allRides_1 = __importDefault(require("./routes/allRides"));
const drivers_1 = __importDefault(require("./routes/drivers"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
var cors = require("cors");
app.use(cors()); // Use this after the variable declaration
app.use(express_1.default.json());
app.use("/", googleRoutes_1.default);
app.use("/", confirmation_1.default);
app.use("/", history_1.default);
app.use("/", allRides_1.default);
app.use("/", drivers_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map