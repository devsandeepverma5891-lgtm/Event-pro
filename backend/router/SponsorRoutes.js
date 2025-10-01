import { Router } from "express";
import {
  selfRegister,
  getAllSponsors,
  getSponsorById,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from "../controllers/SponsorController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// -------------------- Self-registration --------------------
// Sponsor registers themselves
router.post("/register", selfRegister);

// -------------------- Admin CRUD (Protected) --------------------
router.post("/", ensureAuthenticated, createSponsor);
router.get("/", ensureAuthenticated, getAllSponsors);
router.get("/:id", ensureAuthenticated, getSponsorById);
router.put("/:id", ensureAuthenticated, updateSponsor);
router.delete("/:id", ensureAuthenticated, deleteSponsor);

export default router;
