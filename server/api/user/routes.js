import express from "express";
import listAllUserUrl from "./list-all-user-url.js";

const userRoutes = express.Router();

userRoutes.get("/urls", (req, res) => {
  listAllUserUrl(req, res);
});

export default userRoutes;
