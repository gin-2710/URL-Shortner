import express from "express";
import shortenHandler from "./basic-handler.js";
import shortenAliasHandler from "./alias-handler.js";

const shortenRoutes = express.Router();

shortenRoutes.post("", (req, res) => {
  console.log("User", req.user);
  console.log("Body:", req.body);
  shortenHandler(req, res);
});

shortenRoutes.get("/:alias", (req, res) => {
  shortenAliasHandler(req, res);
});

export default shortenRoutes;
