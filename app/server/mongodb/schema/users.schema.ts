import mongoose, { Schema, Types } from "mongoose";
import { CollectionName } from "../mongodb.enum";

export interface UserDB {
  _id: Types.ObjectId;
  email: string;
  image: string;
  name: string;
  credits: number;
  payments: string[];
}

const userSchema = new Schema<UserDB>(
  {
    email: String,
    image: String,
    name: String,
    credits: Number,
    payments: [String],
  },
  { collection: "Users" }
);

export const UserSchema: mongoose.Model<UserDB> = mongoose?.models?.Users || mongoose.model<UserDB>(CollectionName.USERS, userSchema);
