//there will be two routes here: 1. /analytics 2. /shortener. Redirect to their routes.js js filed accordingly
import express from "express";
import analyticsRoutes from "./analytics/routes.js";
import shortenRoutes from "./shorten/routes.js";
import userRoutes from "./user/routes.js";

const apiRouter = express.Router();
apiRouter.use("/analytics", analyticsRoutes);
apiRouter.use("/shorten", shortenRoutes);
apiRouter.use("/user", userRoutes);
apiRouter.get("/test", (req, res) => res.send("Test route"));

export default apiRouter;
