import EventController from "../controllers/event.controller";
import { Router } from "express";

const router = Router();

router.get("/", EventController.getAllEvents);
router.post("/", EventController.createEvent);

export default router;
