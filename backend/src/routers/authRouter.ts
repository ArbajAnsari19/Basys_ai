import express from "express";
import {
  loginHealthcareProvider,
  signupHealthcareProvider,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/signup", signupHealthcareProvider);
router.post("/login", loginHealthcareProvider);

export default router;
