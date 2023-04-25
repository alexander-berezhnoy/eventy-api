import { getEventsByIds } from "./event.service";
import { EventsList, IEventsList } from "../models/EventsList";
import { IEvent } from "../models/Event";

export interface IEventsTable {
  events: IEvent[];
  ignored: number;
  reported: number;
}

export const createEventList = async (): Promise<IEventsList> => {
  try {
    const newEventsList = await EventsList.create({
      ignored: 0,
      reported: 0,
      events: [],
    });
    return newEventsList;
  } catch (error) {
    console.error(error);
    throw new Error("Error on creating events list");
  }
};

export const addEvent = async (
  eventId: string,
  listId?: string
): Promise<IEventsList> => {
  try {
    const eventsList = !listId
      ? await EventsList.findOne({}).exec()
      : await EventsList.findById(listId);
    if (eventsList) {
      eventsList.events.push(eventId);
      const updatedList = !listId
        ? await EventsList.findOneAndUpdate({}, eventsList, { new: true })
        : await EventsList.findByIdAndUpdate(listId, eventsList, { new: true });
      if (updatedList) {
        return updatedList;
      } else {
        throw new Error("Error on updating event list");
      }
    } else {
      throw new Error("Events list is not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error on adding events to list");
  }
};

export const removeEvent = async (eventId: string, listId?: string) => {
  try {
    const eventsList = !listId
      ? await EventsList.findOne({}).exec()
      : await EventsList.findById(listId);
    if (eventsList) {
      const updatedEvents = eventsList.events.filter(
        (itemId) => itemId !== eventId
      );
      const updatedList = !listId
        ? await EventsList.findOneAndUpdate(
            {},
            { $set: { events: updatedEvents } },
            { new: true }
          )
        : await EventsList.findByIdAndUpdate(
            listId,
            { $set: { events: updatedEvents } },
            { new: true }
          );
      if (updatedList) {
        return updatedList;
      } else {
        throw new Error("Error on updating event list");
      }
    } else {
      throw new Error("Events list is not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error on adding events to list");
  }
};

export const getEventsList = async (
  listId?: string | null
): Promise<IEventsTable> => {
  try {
    const eventsList = !listId
      ? await EventsList.findOne({}).exec()
      : await EventsList.findById(listId);
    const eventIds = eventsList?.events ?? [];
    const events = await getEventsByIds(eventIds);
    const eventsTable: IEventsTable = {
      events,
      ignored: eventsList?.ignored ?? 0,
      reported: eventsList?.reported ?? 0,
    };
    return eventsTable;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving events list");
  }
};
