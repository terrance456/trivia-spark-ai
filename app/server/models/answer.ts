import { ObjectId } from "mongodb";

export interface Answer {
  _id: ObjectId;
  answer_title: string;
}
