import { ObjectId } from "mongodb";

export interface TopicDB {
  _id: ObjectId;
  topic_name: string;
  created_at: Date;
}
