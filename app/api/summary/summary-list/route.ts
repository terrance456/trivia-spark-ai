import { SummaryDB, SummarySchema } from "@/app/server/mongodb/schema/summary.schema";
import { auth } from "@/src/auth/auth";

/**
 * @swagger
 * /api/summary/summary-list:
 *   get:
 *     tags: [Summary]
 *     description: Returns all quiz with less details
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetSummaryListResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function GET() {
  try {
    const user = await auth();
    const summaryList: Array<SummaryDB> = await SummarySchema.find({ user_id: user?.user?.email }).limit(7).sort({ _id: -1 });
    if (summaryList.length < 1) {
      return Response.json([]);
    }

    return Response.json(
      summaryList.map((item: SummaryDB) => ({
        _id: item._id,
        no_of_question: item.questions.length,
        topic_name: item.topic_name,
        score: item.score,
      }))
    );
  } catch (e) {
    return Response.json({ message: "Failed to retrive quiz summary, please try again later" }, { status: 500 });
  }
}
