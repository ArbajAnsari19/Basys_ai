import { Request, Response } from "express";
import Patient from "../models/patientModel";

export const getAllPatients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const patients = await Patient.find().skip(skip).limit(limit);
    const totalPatients = await Patient.countDocuments();

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalPatients / limit),
      totalPatients,
      patients,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  const { name, age, medicalHistory } = req.body;
  try {
    const newPatient = new Patient({
      name,
      age,
      medicalHistory,
    });
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOnePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.status(200).json(patient);
  } catch (error: any) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      res.status(400).json({ message: "Invalid patient ID format" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
