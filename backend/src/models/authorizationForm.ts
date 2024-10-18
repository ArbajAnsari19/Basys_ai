import mongoose, { Schema, Document } from "mongoose";

export interface IAuthorizationRequest extends Document {
  patientId: mongoose.Schema.Types.ObjectId;
  treatmentType: string;
  insurancePlan: string;
  dateOfService: Date;
  diagnosisCode: string;
  doctorsNotes: string;
  requestStatus: "pending" | "approved" | "declined";
  isApproved: boolean;
  timestamp: Date;
}

const AuthorizationRequestSchema: Schema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  treatmentType: { 
    type: String, 
    required: true 
  },
  insurancePlan: { 
    type: String, 
    required: true 
  },
  dateOfService: { 
    type: Date, 
    required: true 
  },
  diagnosisCode: { 
    type: String, 
    required: true 
  },
  doctorsNotes: { 
    type: String, 
    required: true 
  },
  requestStatus: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});

// Middleware to update isApproved based on requestStatus
AuthorizationRequestSchema.pre('save', function(next) {
  if (this.isModified('requestStatus')) {
    this.isApproved = this.requestStatus === 'approved';
  }
  next();
});

export default mongoose.model<IAuthorizationRequest>(
  "AuthorizationRequest",
  AuthorizationRequestSchema
);