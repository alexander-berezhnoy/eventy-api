import { IEvent, Event } from "../models/Event";
import { EventsList } from "../models/EventsList";

export const createEvent = async (
  name: string,
  severity: number
): Promise<string> => {
  try {
    const event = await Event.create({
      name,
      severity,
      timestamp: Math.floor(Date.now() / 1000),
    });
    return event._id.toString();
  } catch (error) {
    console.error(error);
    throw new Error("Error on event creation");
  }
};

export const getEventsByIds = async (eventIds: string[]): Promise<IEvent[]> => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving events");
  }
};
