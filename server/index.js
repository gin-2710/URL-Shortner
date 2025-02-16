import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./api/routes.js";
import connectDB from "./db/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json" with { type: 'json' };

const app = express();
dotenv.config();
const PORT = dotenv.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});

await connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api", apiRoutes);
