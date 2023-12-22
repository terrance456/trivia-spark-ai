import { SummaryDB } from "@/app/server/models/summarydb";
import { mongoClient } from "@/app/server/mongodb/connection";
import { auth } from "@/src/auth/auth";
import { WithId } from "mongodb";

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
    const summaryList: Array<WithId<SummaryDB>> = await mongoClient.db("trivia-spark-ai").collection("Summary").find<SummaryDB>({ user_id: user?.user?.email }).toArray();
    if (summaryList.length < 1) {
      return Response.json([]);
    }

    return Response.json(
      summaryList.map((item: SummaryDB) => ({
        _id: item._id,
        questions: item.questions,
        started_at: item.started_at,
        completed_at: item.completed_at,
        topic_name: item.topic_name,
        topic_id: item.topic_id,
        score: item.score,
      }))
    );
  } catch {
    return Response.json({ message: "Failed to retrive quiz summary, please try again later" }, { status: 500 });
  }
}
