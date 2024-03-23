import mongoose from "mongoose";
import { DBName } from "./mongodb.enum";
import { UserSchema } from "./schema/users.schema";
import { User } from "next-auth";

export async function connectDB() {
  if ((global as any).hasDBConnected) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_AUTH as string, { dbName: DBName.TRIVIA_SPARK_AI });
  (global as any).hasDBConnected = true;
}

export function getUserDB(email: string) {
  return UserSchema.findOne({ email: email });
}

export async function handleNewUsers(userInfo: User) {
  const user = await getUserDB(userInfo.email as string);
  if (user) {
    return user;
  }
  return new UserSchema({ email: userInfo.email, name: userInfo.name, credits: 5, image: userInfo.image, payments: [] }).save();
}
