import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  age: number;
  medicalHistory: string;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  medicalHistory: { type: String, required: true },
});

export default mongoose.model<IPatient>("Patient", PatientSchema);
