import { SummaryDB } from "@/app/server/models/summarydb";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { auth } from "@/src/auth/auth";
import { MongoClient, WithId } from "mongodb";

/**
 * @swagger
 * /api/summary/get-all-quiz-summary:
 *   get:
 *     tags: [Summary]
 *     description: Returns all quiz summary details
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetAllQuizSummaryResponse"
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
    const summaryList: Array<WithId<SummaryDB>> = await mongoClient.db("trivia-spark-ai").collection("Summary").find<SummaryDB>({ user_id: user?.user?.email }).sort({ _id: -1 }).toArray();
    if (summaryList.length < 1) {
      return Response.json([]);
    }

    return Response.json(
      summaryList.map((item: SummaryDB) => ({
        _id: item._id,
        no_of_question: item.questions.length,
        topic_name: item.topic_name,
        score: item.score,
        date: item.started_at,
      }))
    );
  } catch (e) {
    return Response.json({ message: "Failed to retrive quiz summary, please try again later" }, { status: 500 });
  }
}
