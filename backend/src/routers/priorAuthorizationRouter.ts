import express from "express";
import {
  createAuthorizationRequest,
  getAllAuthorizationRequests,
  getAuthorizationStatus,
} from "../controllers/priorAuthorizationControllers";

const router = express.Router();

router.post("/", createAuthorizationRequest);
router.get("/", getAllAuthorizationRequests);
router.get("/:id", getAuthorizationStatus);


export default router;
