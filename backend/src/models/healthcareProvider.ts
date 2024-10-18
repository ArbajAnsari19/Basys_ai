import mongoose, { Schema, Document } from "mongoose";

export interface IHealthcareProvider extends Document {
  email: string;
  password: string;
}

const HealthcareProviderSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IHealthcareProvider>(
  "HealthcareProvider",
  HealthcareProviderSchema
);
