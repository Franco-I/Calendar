// aqui defino las rutas que llaman los controladores!

import express from "express";
import {
  getAllActivities,
  createActivity,
  updateActivityStatus
} from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getAllActivities);
router.post("/", createActivity);
router.patch("/:id/status", updateActivityStatus);


export default router;
