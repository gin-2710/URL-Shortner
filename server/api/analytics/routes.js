import express from "express";
import analyticsAliasHandler from "./alias-handler";
import analyticsOverallHandler from "./overall-handler";
import analyticsTopicHandler from "./topic-handler";

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
