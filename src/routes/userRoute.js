import express from "express";
import {
  createUser,
  login,
  logout,
  getProfile,
  updateProfile
} from "../controllers/userController.js";
import { checkToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", login);
router.get("/profile", checkToken, getProfile);
router.put("/profile", checkToken, updateProfile);
router.post("/logout", logout);


export default router;
