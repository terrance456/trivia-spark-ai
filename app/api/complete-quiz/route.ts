import { QuestionsSessionDB, SessionQuestionList } from "@/app/server/models/questionssessiondb";
import { CompleteQuizRequestSchemaT, completeQuizRequestSchema } from "@/app/server/models/requests/complete-quiz";
import { formatCompletedQuiz } from "@/app/server/mongodb/completed-quiz";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { CollectionName, DBName } from "@/app/server/mongodb/mongodb.enum";
import { auth } from "@/src/auth/auth";
import { InsertOneResult, MongoClient, ObjectId } from "mongodb";
import { NextRequest } from "next/server";

/**
 * @swagger
 * /api/complete-quiz:
 *   post:
 *     tags: [Summary]
 *     description: Ends the quiz session and returns completion_id
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CompleteQuizPayload"
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/CompleteQuizResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function POST(request: NextRequest) {
  let payload: CompleteQuizRequestSchemaT;
  const completedTime: number = Date.now();
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  const parsedPayload = completeQuizRequestSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  try {
    const mongoClient: MongoClient = await getMongoClient();
    const session = await mongoClient
      .db(DBName.TRIVIA_SPARK_AI)
      .collection(CollectionName.QUESTIONSSESSIONS)
      .findOne<QuestionsSessionDB>({ _id: new ObjectId(parsedPayload.data.session_id) });

    if (!session) {
      return Response.json({ message: "Invalid session id" }, { status: 400 });
    }

    const user = await auth();
    if (session.user_id !== user?.user?.email) {
      return Response.json({ message: "Invalid user" }, { status: 400 });
    }

    const currentSubmissonTime: number = session.started_at + 60 * 10 * 1000; // 10 minutes
    if (Date.now() > currentSubmissonTime) {
      return Response.json({ message: "Sorry your session has ended, please retake the quiz" }, { status: 400 });
    }

    if (session.questions.some((item: SessionQuestionList) => !item.completed)) {
      return Response.json({ message: "Please complete every question before proceeding to completion" }, { status: 400 });
    }

    const formattedQuizSummary = formatCompletedQuiz(session, completedTime);
    const res: InsertOneResult<Document> = await mongoClient.db(DBName.TRIVIA_SPARK_AI).collection(CollectionName.SUMMARY).insertOne(formattedQuizSummary);
    await mongoClient.db(DBName.TRIVIA_SPARK_AI).collection(CollectionName.QUESTIONSSESSIONS).deleteOne({ _id: session._id });
    return Response.json({ completed_id: res.insertedId });
  } catch {
    return Response.json({ message: "Failed to complete quiz, please try again" }, { status: 500 });
  }
}
