import { Router } from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from "../controllers/StallBookingController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// Self-registration
router.post("/register", createBooking);

// Admin CRUD (auth required)
router.post("/", ensureAuthenticated, createBooking);
router.get("/", ensureAuthenticated, getBookings);
router.get("/:id", ensureAuthenticated, getBookingById);
router.put("/:id", ensureAuthenticated, updateBooking);
router.delete("/:id", ensureAuthenticated, deleteBooking);

export default router;
