import express from "express";
import {
  getAllPatients,
  createPatient,
  getOnePatient
} from "../controllers/patientControllers";

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", createPatient);
router.get("/:id", getOnePatient);

export default router;
