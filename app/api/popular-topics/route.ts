import { TopicsSchema } from "@/app/server/mongodb/schema/topics.schema";

/**
 * @swagger
 * /api/popular-topics:
 *   get:
 *     tags: [Topic]
 *     description: Returns popular topics in DB
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetPopularTopicModelResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */
export async function GET() {
  try {
    const result = await TopicsSchema.find().sort({ count: -1 }).limit(10);
    return Response.json(result.map(({ topic_name, no_of_question }) => ({ topic_name, no_of_question })));
  } catch {
    return Response.json({ message: "Failed to fetch popular topics" }, { status: 500 });
  }
}
