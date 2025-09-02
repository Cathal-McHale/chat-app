import express, { Router } from "express";
import {login, logout, signup} from "../controllers/auth.controllers.js";


const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// if the user is logged in they can update profile
router.put("/update-profile", protectRoute, updateProfile)



export default router