import { getQuizSummarySchema } from "@/app/server/models/requests/get-quiz-summary";
import { SummaryDB } from "@/app/server/models/summarydb";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { auth } from "@/src/auth/auth";
import { MongoClient, ObjectId, WithId } from "mongodb";

/**
 * @swagger
 * /api/summary/get-quiz-summary/{completion_id}:
 *   get:
 *     tags: [Summary]
 *     description: Returns summary details for a specific quiz
 *     parameters:
 *      - name: completion_id
 *        in: path
 *        required: true
 *        description: Summary id
 *        schema:
 *         type: string
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetQuizSummaryResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const completion_id: string = params.slug;
  const parsedPayload = getQuizSummarySchema.safeParse({ completion_id });

  if (!parsedPayload.success) {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  try {
    const user = await auth();
    const mongoClient: MongoClient = await getMongoClient();
    const summary: WithId<SummaryDB> | null = await mongoClient
      .db("trivia-spark-ai")
      .collection("Summary")
      .findOne<SummaryDB>({ user_id: user?.user?.email, _id: new ObjectId(parsedPayload.data.completion_id) });
    if (!summary) {
      return Response.json({ message: "Summary details for this quiz doesnt exist" }, { status: 400 });
    }
    return Response.json({
      _id: summary._id,
      questions: summary.questions,
      started_at: summary.started_at,
      completed_at: summary.completed_at,
      topic_name: summary.topic_name,
      topic_id: summary.topic_id,
      score: summary.score,
    });
  } catch {
    return Response.json({ message: "Failed to retrive quiz summary, please try again later" }, { status: 500 });
  }
}
