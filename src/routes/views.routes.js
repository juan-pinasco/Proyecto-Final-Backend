import { Router } from "express";
const router = Router();

import { verifyToken, isPremium, isAdmin } from "../middlewares/authJwt.js";

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/homeProfile", verifyToken, (req, res) => {
  res.render("homeProfile");
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

router.get("/creatProduct", (req, res) => {
  res.render("products/creatProduct");
});

export default router;
