import { QuestionsSessionDB } from "@/app/server/models/questionssessiondb";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { auth } from "@/src/auth/auth";
import { MongoClient, WithId } from "mongodb";

/**
 * @swagger
 * /api/get-ongoing-sessions:
 *   get:
 *     tags: [Ongoing Sessions]
 *     description: Returns list of ongoing quizez
 *
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetOngoingSessionResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function GET() {
  try {
    const user = await auth();
    const mongoClient: MongoClient = await getMongoClient();
    const session: Array<WithId<QuestionsSessionDB>> = await mongoClient.db("trivia-spark-ai").collection("QuestionsSessions").find<QuestionsSessionDB>({ user_id: user?.user?.email }).toArray();

    if (session.length < 1) {
      return Response.json([]);
    }

    const filterSession: Array<WithId<QuestionsSessionDB>> = [];
    const removeSession: Array<WithId<QuestionsSessionDB>> = [];

    session.forEach((v: WithId<QuestionsSessionDB>) => {
      if (v.started_at + 60 * 10 * 1000 >= Date.now()) {
        filterSession.push(v);
        return;
      }
      removeSession.push(v);
    });

    if (removeSession.length > 0) {
      await mongoClient
        .db("trivia-spark-ai")
        .collection<QuestionsSessionDB>("QuestionsSessions")
        .deleteMany({ _id: { $in: removeSession.map((v: WithId<QuestionsSessionDB>) => v._id) } });
    }

    return Response.json(
      filterSession.map((v: WithId<QuestionsSessionDB>) => ({
        question_id: v.questions[0].question_id,
        session_id: v._id,
        topic_id: v.topic_id,
        topic_name: v.topic_name,
        no_of_question: v.questions.length,
        started_at: v.started_at,
      }))
    );
  } catch {
    return Response.json({ message: "Failed to fetch ongoing session" }, { status: 500 });
  }
}
