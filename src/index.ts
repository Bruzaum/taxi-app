import express from "express";
import googleRoutes from "./routes/googleRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", googleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
