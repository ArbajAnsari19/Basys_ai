import { Request, Response } from "express";
import AuthorizationRequest, { IAuthorizationRequest } from "../models/authorizationForm";
import Patient from "../models/patientModel";

export const createAuthorizationRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { patientId, treatmentType, insurancePlan, dateOfService, diagnosisCode, doctorsNotes } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    const newRequest = new AuthorizationRequest({
      patientId,
      treatmentType,
      insurancePlan,
      dateOfService,
      diagnosisCode,
      doctorsNotes,
    });

    const savedRequest = await newRequest.save();

    res.status(201).json(savedRequest);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAuthorizationRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const requests = await AuthorizationRequest.find().populate("patientId");

    res.status(200).json(requests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneAuthorizationRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const requestId = req.params.id;
    const request = await AuthorizationRequest.findById(requestId).populate("patientId");

    if (!request) {
      res.status(404).json({ message: "Authorization request not found" });
      return;
    }

    res.status(200).json(request);
  } catch (error: any) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      res.status(400).json({ message: "Invalid authorization request ID format" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getAuthorizationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const requestId = req.params.id;
    
    const request = await AuthorizationRequest.findById(requestId).select('requestStatus isApproved');

    if (!request) {
      res.status(404).json({ message: "Authorization request not found" });
      return;
    }

    res.status(200).json({ 
      requestStatus: request.requestStatus,
      isApproved: request.isApproved 
    });
  } catch (error: any) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      res.status(400).json({ message: "Invalid authorization request ID format" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// New function to update authorization request status
export const updateAuthorizationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const requestId = req.params.id;
    const { requestStatus } = req.body;

    if (!['pending', 'approved', 'declined'].includes(requestStatus)) {
      res.status(400).json({ message: "Invalid request status" });
      return;
    }

    const updatedRequest = await AuthorizationRequest.findByIdAndUpdate(
      requestId,
      { requestStatus },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      res.status(404).json({ message: "Authorization request not found" });
      return;
    }

    res.status(200).json(updatedRequest);
  } catch (error: any) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      res.status(400).json({ message: "Invalid authorization request ID format" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};