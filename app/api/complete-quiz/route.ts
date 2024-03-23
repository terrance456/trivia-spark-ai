import { CompleteQuizRequestSchemaT, completeQuizRequestSchema } from "@/app/server/models/requests/complete-quiz";
import { formatCompletedQuiz } from "@/app/server/mongodb/completed-quiz";
import { QuestionsSessionsDB, QuestionsSessionsSchema, SessionQuestionList } from "@/app/server/mongodb/schema/questions-session.schema";
import { SummaryDB, SummarySchema } from "@/app/server/mongodb/schema/summary.schema";
import { auth } from "@/src/auth/auth";
import { Types } from "mongoose";
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
    const session: QuestionsSessionsDB | null = await QuestionsSessionsSchema.findOne({ _id: new Types.ObjectId(parsedPayload.data.session_id) });

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
    const res: SummaryDB = await new SummarySchema(formattedQuizSummary).save();
    await QuestionsSessionsSchema.deleteOne({ _id: session._id });
    return Response.json({ completed_id: res._id });
  } catch {
    return Response.json({ message: "Failed to complete quiz, please try again" }, { status: 500 });
  }
}
