import express from "express";
import analyticsAliasHandler from "./alias-handler.js";
import analyticsOverallHandler from "./overall-handler.js";
import analyticsTopicHandler from "./topic-handler.js";

const analyticsRoutes = express.Router();

analyticsRoutes.get("/:alias", (req, res) => {
  analyticsAliasHandler(req, res);
});

analyticsRoutes.get("/topic/:topic", (req, res) => {
  analyticsTopicHandler(req, res);
});

analyticsRoutes.get("/overall", (req, res) => {
  analyticsOverallHandler(req, res);
});

export default analyticsRoutes;
