import { TopicDB } from "@/app/server/models/topicdb";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { CollectionName, DBName } from "@/app/server/mongodb/mongodb.enum";
import { MongoClient, WithId } from "mongodb";

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
    const mongoClient: MongoClient = await getMongoClient();
    const result: WithId<TopicDB>[] = await mongoClient.db(DBName.TRIVIA_SPARK_AI).collection<TopicDB>(CollectionName.TOPICS).find().sort({ counts: -1 }).limit(10).toArray();
    return Response.json(result.map(({ topic_name, no_of_question }: WithId<TopicDB>) => ({ topic_name, no_of_question })));
  } catch {
    return Response.json({ message: "Failed to fetch popular topics" }, { status: 500 });
  }
}
