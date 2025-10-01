import { Router } from "express";
import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
  checkInGuest,
  checkOutGuest
} from "../controllers/GuestController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// Self-registration (no auth required)
router.post("/register", createGuest);

// Admin/manager CRUD (auth required)
router.post("/", ensureAuthenticated, createGuest);
router.get("/", ensureAuthenticated, getGuests);
router.get("/:id", ensureAuthenticated, getGuestById);
router.put("/:id", ensureAuthenticated, updateGuest);
router.delete("/:id", ensureAuthenticated, deleteGuest);

// Check-in / Check-out (auth required)
router.post("/:id/checkin", ensureAuthenticated, checkInGuest);
router.post("/:id/checkout", ensureAuthenticated, checkOutGuest);

export default router;

