import { Request, Response } from "express";
import HealthcareProvider from "../models/healthcareProvider";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const signupHealthcareProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingProvider = await HealthcareProvider.findOne({ email });
    if (existingProvider) {
      res.status(400).json({ message: "Healthcare provider already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newProvider = new HealthcareProvider({
      email,
      password: hashedPassword,
    });

    await newProvider.save();

    res
      .status(201)
      .json({ message: "Healthcare provider registered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginHealthcareProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const healthcareProvider = await HealthcareProvider.findOne({ email });
    if (!healthcareProvider) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, healthcareProvider.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: healthcareProvider._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
