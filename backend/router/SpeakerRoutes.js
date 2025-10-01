import { Router } from "express";
import {
  createSpeaker,
  getSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
  checkInSpeaker,
  checkOutSpeaker
} from "../controllers/SpeakersController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// Self-registration (no auth required)
router.post("/register", createSpeaker);

// Admin/manager CRUD (auth required)
router.post("/", ensureAuthenticated, createSpeaker);
router.get("/", ensureAuthenticated, getSpeakers);
router.get("/:id", ensureAuthenticated, getSpeakerById);
router.put("/:id", ensureAuthenticated, updateSpeaker);
router.delete("/:id", ensureAuthenticated, deleteSpeaker);

// Check-in / Check-out (auth required)
router.post("/:id/checkin", ensureAuthenticated, checkInSpeaker);
router.post("/:id/checkout", ensureAuthenticated, checkOutSpeaker);

export default router;
