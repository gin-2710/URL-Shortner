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
    successRedirect: "http://localhost:5173/home",
    // successRedirect: "http://localhost:5173/api/test",
    failureRedirect: "http://localhost:5173/",
  })
);

authRoutes.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid", { path: "/" }); // Clear session cookie
      res.status(200).json({ message: "Logged out successfully" }); // Send JSON response
    });
  });
});

authRoutes.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default authRoutes;
