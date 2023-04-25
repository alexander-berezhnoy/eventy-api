import { Request, Response } from "express";
import { createEvent, getEventsByIds } from "../services/event.service";
import { addEvent, getEventsList } from "../services/eventslist.service";

const handleCreateEvent = async (req: Request, res: Response) => {
  try {
    const { name, severity } = req.body;
    const newEventId = await createEvent(name, severity);
    const updatedEventsList = await addEvent(newEventId);
    res.status(201).json(updatedEventsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

const handleGetAllEvents = async (req: Request, res: Response) => {
  try {
    const eventsList = await getEventsList();
    res.json(eventsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export default {
  createEvent: handleCreateEvent,
  getAllEvents: handleGetAllEvents,
};
