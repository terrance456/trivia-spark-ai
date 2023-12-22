import { ObjectId } from "mongodb";

export interface Question {
  _id: ObjectId;
  title: string;
}
