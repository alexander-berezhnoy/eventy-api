import { Schema, Types, model, Document } from "mongoose";

export interface IEventsList extends Document {
  events: string[];
  ignored: number;
  reported: number;
}

const eventsListSchema = new Schema<IEventsList>({
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  ignored: { type: Number, default: 0 },
  reported: { type: Number, default: 0 },
});

export const EventsList = model<IEventsList>("EventsList", eventsListSchema);
