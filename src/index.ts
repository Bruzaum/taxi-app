import express from "express";
import rideEstimate from "./ride/estimate";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", rideEstimate);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
