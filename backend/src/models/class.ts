import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  language: string;
  teacher: mongoose.Types.ObjectId;
  imgUrl: string;
  students: mongoose.Types.ObjectId[];
  schedules: mongoose.Types.ObjectId[];
}

const ClassSchema: Schema = new Schema({
  language: { type: String, required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  imgUrl: { type: String, required: true },
  students: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  schedules: [{ type: mongoose.Types.ObjectId, ref: "Schedule" }],
});

export default mongoose.model<IClass>("Class", ClassSchema);
