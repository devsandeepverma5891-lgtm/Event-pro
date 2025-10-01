import { Router } from "express";
import {
  createNomination,
  getNominations,
  getNominationById,
  updateNomination,
  deleteNomination,
  checkInNominee,
  checkOutNominee
} from "../controllers/AwardNominationController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// Self-registration
router.post("/register", createNomination);

// Admin CRUD (auth required)
router.post("/", ensureAuthenticated, createNomination);
router.get("/", ensureAuthenticated, getNominations);
router.get("/:id", ensureAuthenticated, getNominationById);
router.put("/:id", ensureAuthenticated, updateNomination);
router.delete("/:id", ensureAuthenticated, deleteNomination);

// Check-in / Check-out (auth required)
router.post("/:id/checkin", ensureAuthenticated, checkInNominee);
router.post("/:id/checkout", ensureAuthenticated, checkOutNominee);

export default router;
