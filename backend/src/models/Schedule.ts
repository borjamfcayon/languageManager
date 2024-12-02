import mongoose, { Schema, Document } from 'mongoose';

export interface ISchedule extends Document {
    day: string;
    hours: string[];
}

const ScheduleSchema: Schema = new Schema({
    day: { type: String, required: true },
    hours: [{ type: String, required: true }],
});

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);
