import { GetQuestionRequestSchemaT, getQuestionRequestSchema } from "@/app/server/models/requests/get-question";
import { CollectionName, DBName } from "@/app/server/mongodb/mongodb.enum";
import { QuestionsSessionsSchema, SessionQuestionList } from "@/app/server/mongodb/schema/questions-session.schema";
import { auth } from "@/src/auth/auth";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

/**
 * @swagger
 * /api/get-question:
 *   post:
 *     tags: [Questions]
 *     description: Returns next questions in the quiz
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/GetQuestionPayload"
 *
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetQuestionResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function POST(request: NextRequest) {
  let payload: GetQuestionRequestSchemaT;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  const parsedPayload = getQuestionRequestSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  try {
    const session = await QuestionsSessionsSchema.findOne({ _id: new Types.ObjectId(parsedPayload.data.session_id) });

    if (!session) {
      return Response.json({ message: "Invalid session id" }, { status: 400 });
    }

    const user = await auth();
    if (session.user_id !== user?.user?.email) {
      return Response.json({ message: "Invalid user" }, { status: 400 });
    }

    if (!session.topic_id.equals(new Types.ObjectId(parsedPayload.data.topic_id))) {
      return Response.json({ message: "Invalid topic id" }, { status: 400 });
    }

    const currentQuestion: SessionQuestionList | undefined = session.questions.find((question: SessionQuestionList) => question.question_id.equals(new Types.ObjectId(parsedPayload.data.question_id)));
    if (!currentQuestion) {
      return Response.json({ message: "Invalid question id" }, { status: 400 });
    }

    const currentQuestionIndex: number = session.questions.findIndex((v: SessionQuestionList) => v.question_id.equals(parsedPayload.data.question_id));
    if (currentQuestionIndex !== 0 && !session.questions[currentQuestionIndex - 1].completed) {
      return Response.json({ message: "Question cant be skipped, follow the order of the quiz" }, { status: 400 });
    }

    return Response.json({
      _id: session._id,
      started_at: session.started_at,
      topic_name: session.topic_name,
      topic_id: session.topic_id,
      next_question_id: session.questions[currentQuestionIndex + 1]?.question_id || null,
      prev_question_id: currentQuestionIndex === 0 ? null : session.questions[currentQuestionIndex - 1].question_id,
      question: { _id: currentQuestion.question_id, title: currentQuestion.question_title, user_answer_id: currentQuestion.user_answer_id },
      answers: currentQuestion.answers,
      user_answer_id: currentQuestion.user_answer_id,
      question_no: session.questions.findIndex((v: SessionQuestionList) => v.question_id.equals(currentQuestion.question_id)),
    });
  } catch {
    return Response.json({ message: "Failed to fetch question" }, { status: 500 });
  }
}
