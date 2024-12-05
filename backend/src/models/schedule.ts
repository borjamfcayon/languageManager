import { model, Schema, Document } from "mongoose";

export interface ISchedule extends Document {
  day: string;
  hours: number[];
}

const scheduleSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  hours: [
    {
      type: Number,
      required: true,
    },
  ],
});

export default model<ISchedule>("Schedule", scheduleSchema);
