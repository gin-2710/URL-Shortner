import express from "express";
import shortenHandler from "./basic-handler.js";
const shortenRoutes = express.Router();

shortenRoutes.get("", (req, res) => {
  shortenHandler(req, res);
});

shortenRoutes.get("/:alias", (req, res) => {
  res.send("Shorten alias route");
});

export default shortenRoutes;