import express, { Router } from "express";
import {login, logout, signup, updateProfile, checkAuth} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// if the user is logged in they can update profile
router.put("/update-profile", protectRoute, updateProfile)

//check if user is auth or not
router.get("/check", protectRoute, checkAuth)



export default router