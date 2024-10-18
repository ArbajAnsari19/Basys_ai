import express from "express";
import mongoose from "mongoose";
import patientRouter from "./routers/patientRouter";
import priorAuthorizationRouter from "./routers/priorAuthorizationRouter";
import authRouter from "./routers/authRouter";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGO_URI || "mongodb+srv://Arbaj19:Arbaj19@arbaj.k56wb.mongodb.net/"
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully");
});

mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to MongoDB: ${err.message}`);
});

app.use("/api/patients", patientRouter);
app.use("/api/authorizations", priorAuthorizationRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
