import { Router } from "express";
import eventRouter from "./event.router";

const routers = Router();

routers.use("/events", eventRouter);

export default routers;
