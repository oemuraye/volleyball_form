import express from "express";
import { deletedTeamPlayer, errorPage, getTeamPlayer, homePage, successPage, teamPage } from "../controllers/pages.js";
import { register, upload } from "../controllers/player.js";

const router = express.Router();

// Web Pages
router.get("/", homePage);
router.get("/success", successPage);
router.get("/error", errorPage);

router.post("/register", upload, register);

// View all entries
router.get("/team", teamPage);

router.get("/show/:id", getTeamPlayer);
router.post("/delete/:id", deletedTeamPlayer);

  
  // View specific entry
router.get("/player/:id", (req, res) => {
}); 

export default router;