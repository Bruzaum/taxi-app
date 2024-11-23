import express from "express";
import googleRoutes from "./routes/googleRoutes";
import confirmation from "./routes/confirmation";
import history from "./routes/history";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/", googleRoutes);
app.use("/", confirmation);
app.use("/", history);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
