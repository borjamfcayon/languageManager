import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
    language: string;
    teacher: string;
    schedule: mongoose.Types.ObjectId;
}

const ClassSchema: Schema = new Schema({
    language: { type: String, required: true },
    teacher: { type: String, required: true },
    schedule: { type: mongoose.Types.ObjectId, ref: 'Schedule' },
});

export default mongoose.model<IClass>('Class', ClassSchema);
