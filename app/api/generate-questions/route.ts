import { generateGPTQuestions } from "@/app/server/gpt/gpt";
import { GenerateQuestionsRequestT, generateQuestionRequestSchema } from "@/app/server/models/requests/generate-questions";
import { TopicDB } from "@/app/server/models/topicdb";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { generateQuestionSession } from "@/app/server/mongodb/create-session";
import { insertQuestionToDB, insertTopicToDB, insertAnswerToDB } from "@/app/server/mongodb/format-question-answer";
import { auth } from "@/src/auth/auth";
import { MongoClient, WithId } from "mongodb";

/**
 * @swagger
 * /api/generate-questions:
 *   post:
 *     tags: [Questions]
 *     description: Generates new questions using GPT AI
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/GenerateQuestionPayload"
 *
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenerateQuestionResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */
export async function POST(request: Request) {
  let payload: GenerateQuestionsRequestT;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  const parsedPayload = generateQuestionRequestSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return Response.json({ message: "Invalid request payload" }, { status: 400 });
  }

  try {
    const mongoClient: MongoClient = await getMongoClient();
    const userEmail: string = (await auth())?.user?.email as string;
    // check db for similar questions
    const topic: WithId<TopicDB> | null = await mongoClient.db("trivia-spark-ai").collection("Topics").findOne<TopicDB>({ topic_name: parsedPayload.data.topic.toLocaleLowerCase() });

    // Send new generated questions
    if (!topic) {
      const res = await generateGPTQuestions(parsedPayload.data.no_of_questions, parsedPayload.data.topic);
      const topicDetails = await insertTopicToDB(parsedPayload.data.topic, mongoClient);
      const questionsDetails = await insertQuestionToDB(res, topicDetails.insertedId, mongoClient);
      await insertAnswerToDB(res, questionsDetails.insertedIds, topicDetails.insertedId, mongoClient);
      const latestTopic: WithId<TopicDB> | null = await mongoClient.db("trivia-spark-ai").collection("Topics").findOne<TopicDB>({ _id: topicDetails.insertedId });
      const finalResponse = await generateQuestionSession(latestTopic as TopicDB, userEmail, mongoClient);
      return Response.json(finalResponse);
    }

    // Send availalble questions
    const finalResponse = await generateQuestionSession(topic as TopicDB, userEmail, mongoClient);
    return Response.json(finalResponse);
  } catch {
    return Response.json({ message: "Question generation has failed, please try again later" }, { status: 500 });
  }
}
