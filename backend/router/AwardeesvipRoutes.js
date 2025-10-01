import { Router } from "express";
import {
  createAwardeeVip,
  getAwardeesVip,
  getAwardeeByIdVip,
  updateAwardeeVip,
  deleteAwardeeVip,
  checkInAwardeeVip,
  checkOutAwardeeVip
} from "../controllers/AwardeevipController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// Public routes (no auth required)
router.post("/register", createAwardeeVip);
router.get("/public", getAwardeesVip);
router.get("/public/:id", getAwardeeByIdVip);

// Protected routes (auth required)
router.post("/", ensureAuthenticated, createAwardeeVip);
router.get("/", ensureAuthenticated, getAwardeesVip);
router.get("/:id", ensureAuthenticated, getAwardeeByIdVip);
router.put("/:id", ensureAuthenticated, updateAwardeeVip);
router.delete("/:id", ensureAuthenticated, deleteAwardeeVip);

// Check-in / Check-out (auth required)
router.post("/:id/checkin", ensureAuthenticated, checkInAwardeeVip);
router.post("/:id/checkout", ensureAuthenticated, checkOutAwardeeVip);

export default router;
