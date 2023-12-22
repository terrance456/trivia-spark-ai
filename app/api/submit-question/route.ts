import { Answer } from "@/app/server/models/answer";
import { QuestionsSessionDB, SessionQuestionList } from "@/app/server/models/questionssessiondb";
import { submitQuestionRequestSchema, SubmitQuestionRequestSchemaT } from "@/app/server/models/requests/submit-question";
import { mongoClient } from "@/app/server/mongodb/connection";
import { auth } from "@/src/auth/auth";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

/**
 * @swagger
 * /api/submit-question:
 *   post:
 *     tags: [Questions]
 *     description: Submit answer and return message
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/SubmitQuestionPayload"
 *
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/SubmitQuestionResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function POST(request: NextRequest) {
  let payload: SubmitQuestionRequestSchemaT;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  const parsedPayload = submitQuestionRequestSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  try {
    await mongoClient.connect();
    const session = await mongoClient
      .db("trivia-spark-ai")
      .collection("QuestionsSessions")
      .findOne<QuestionsSessionDB>({ _id: new ObjectId(parsedPayload.data.session_id) });

    if (!session) {
      return Response.json({ message: "Invalid session id" }, { status: 400 });
    }

    const user = await auth();
    if (session.user_id !== user?.user?.email) {
      return Response.json({ message: "Invalid user" }, { status: 400 });
    }

    if (!session.topic_id.equals(new ObjectId(parsedPayload.data.topic_id))) {
      return Response.json({ message: "Invalid topic id" }, { status: 400 });
    }

    const currentQuestion: SessionQuestionList | undefined = session.questions.find((question: SessionQuestionList) => question.question_id.equals(new ObjectId(parsedPayload.data.question_id)));
    if (!currentQuestion) {
      return Response.json({ message: "Invalid question id" }, { status: 400 });
    }

    const currentAnswer: Answer | undefined = currentQuestion.answers.find((answer: Answer) => answer._id.equals(new ObjectId(parsedPayload.data.answer_id)));
    if (!currentAnswer) {
      return Response.json({ message: "Invalid asnwer id" }, { status: 400 });
    }

    const currentSubmissonTime: number = session.started_at + 60 * 10 * 1000; // 10 minutes
    if (Date.now() > currentSubmissonTime) {
      return Response.json({ message: "Sorry your session has ended, please retake the quiz" }, { status: 400 });
    }

    // patch user answer
    try {
      await mongoClient
        .db("trivia-spark-ai")
        .collection("QuestionsSessions")
        .updateOne({ _id: session._id, questions: { $elemMatch: { question_id: currentQuestion.question_id } } }, { $set: { "questions.$.user_answer_id": parsedPayload.data.answer_id, "questions.$.completed": true } });
    } catch {
      return Response.json({ message: "Answer updatation failed, please try again later" }, { status: 500 });
    }
    await mongoClient.close();
    return Response.json({ success: true });
  } catch {
    await mongoClient.close();
    return Response.json({ message: "Failed to fetch question" }, { status: 500 });
  }
}
