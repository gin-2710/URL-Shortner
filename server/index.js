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
import rateLimit from 'express-rate-limit'

const app = express();
dotenv.config();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies
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

app.use("/api", limiter, isAuthenticated, apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});

console.log("heyheyehey")