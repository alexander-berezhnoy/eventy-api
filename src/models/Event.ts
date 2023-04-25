import { Schema, model, Types } from "mongoose";

export interface IEvent {
  _id: Types.ObjectId;
  name: string;
  timestamp: number;
  severity: "low" | "medium" | "high";
}

export const EventSchema = new Schema<IEvent>({
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
});

export const Event = model<IEvent>("Event", EventSchema);
