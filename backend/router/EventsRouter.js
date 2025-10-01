import { Router } from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controllers/EventsController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// CRUD routes
router.post("/", ensureAuthenticated, createEvent); // Create
router.get("/", ensureAuthenticated, getEvents);   // Read all
router.get("/:id", ensureAuthenticated, getEventById); // Read single
router.put("/:id", ensureAuthenticated, updateEvent);  // Update
router.delete("/:id", ensureAuthenticated, deleteEvent); // Delete

export default router;