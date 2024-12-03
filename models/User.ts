import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
    mainLanguage: string;
    class: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mainLanguage: { type: String, required: true },
    class: [{ type: mongoose.Types.ObjectId, ref: 'Class' }],
});

export default mongoose.model<IUser>('User', UserSchema);
