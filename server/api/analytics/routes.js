import express from "express";

const analyticsRoutes = express.Router();

analyticsRoutes.get("/:alias", (req, res) => {
    res.send("Analytics alias route");
});

analyticsRoutes.get("/topic/:topic", (req, res) => {
    res.send("Analytics topic route");
});

analyticsRoutes.get("/overall", (req, res) => {
    res.send("Analytics overall route");
});

export default analyticsRoutes;