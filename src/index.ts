import express from "express";
import drivers from "./routes/drivers";
import customers from "./routes/customers";
import googleRoutes from "./routes/googleRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", drivers);
app.use("/api", customers);
app.use("/api", googleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
