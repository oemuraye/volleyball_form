import express from "express";
import { homePage } from "../controllers/pages.js";

const router = express.Router();

// Web Pages
router.get("/", homePage);

export default router;