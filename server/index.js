import express from "express";
import session from "express-session";
import passport from "passport";
import "./middleware/passport.js";
import dotenv from "dotenv";
import apiRoutes from "./api/routes.js";
import connectDB from "./db/db.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json" with { type: 'json' };
import isAuthenticated from "./middleware/authenticateRequest.js";
import authRoutes from "./middleware/auth.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

await connectDB();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api", isAuthenticated, apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});