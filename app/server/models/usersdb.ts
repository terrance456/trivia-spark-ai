import { ObjectId } from "mongodb";

export interface Users {
  _id: ObjectId;
  email: string;
  credits: number;
  payments: Array<any>;
}
