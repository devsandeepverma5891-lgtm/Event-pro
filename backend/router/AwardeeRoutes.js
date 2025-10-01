import { Router } from "express";
import { 
  createAwardee, 
  getAwardees, 
  getAwardeeById, 
  updateAwardee, 
  deleteAwardee 
} from "../controllers/AwardeeController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// -------------------- Admin Routes (Protected) --------------------
router.post("/", ensureAuthenticated, createAwardee);
router.get("/", ensureAuthenticated, getAwardees);
router.get("/:id", ensureAuthenticated, getAwardeeById);
router.put("/:id", ensureAuthenticated, updateAwardee);
router.delete("/:id", ensureAuthenticated, deleteAwardee);

export default router;
