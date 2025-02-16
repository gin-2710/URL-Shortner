import express from "express";
import passport from "passport";

const authRoutes = express.Router();

authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "http://localhost:5173/home",
    successRedirect: "http://localhost:5173/api/test",
    failureRedirect: "http://localhost:5173/",
  })
);

authRoutes.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

export default authRoutes;
