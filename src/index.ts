import express from "express";
import googleRoutes from "./routes/googleRoutes";
import confirmation from "./routes/confirmation";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", googleRoutes);
app.use("/api", confirmation);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
