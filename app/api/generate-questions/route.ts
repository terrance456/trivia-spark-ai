import { generateGPTQuestions } from "@/app/server/gpt/gpt";
import { validateGPTOutput } from "@/app/server/gpt/validate";
import { ProfanityT } from "@/app/server/models/profanity";
import { GenerateQuestionsRequestT, generateQuestionRequestSchema } from "@/app/server/models/requests/generate-questions";
import { TopicDB } from "@/app/server/models/topicdb";
import { Users } from "@/app/server/models/usersdb";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { generateQuestionSession } from "@/app/server/mongodb/create-session";
import { insertQuestionToDB, insertTopicToDB, insertAnswerToDB, updateTopicCount } from "@/app/server/mongodb/format-question-answer";
import { deductCredits } from "@/app/server/mongodb/users-method";
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
    return Response.json({ message: parsedPayload.error.issues[0].message }, { status: 400 });
  }

  // porfanity checker
  try {
    const response: Response = await fetch(`https://api.api-ninjas.com/v1/profanityfilter?text=${parsedPayload.data.topic}`, { headers: { "X-Api-Key": process.env.PROFANITY_APIKEY as string } });
    const jsonRes: ProfanityT = await response.json();
    if (jsonRes.has_profanity) {
      return Response.json({ message: "No profanity words are allowed, be creative 😁" }, { status: 400 });
    }
  } catch {
    return Response.json({ message: "Question generation has failed, please try again later" }, { status: 500 });
  }

  // question generation
  try {
    const mongoClient: MongoClient = await getMongoClient();
    const userEmail: string = (await auth())?.user?.email as string;
    const dbUser: Users | null = await mongoClient.db("trivia-spark-ai").collection<Users>("Users").findOne({ email: userEmail });
    if (dbUser && dbUser.credits < 1) {
      return Response.json({ message: "Please purchase more credits to generate more quizzes" }, { status: 400 });
    }

    const topic: WithId<TopicDB> | null = await mongoClient.db("trivia-spark-ai").collection("Topics").findOne<TopicDB>({ topic_name: parsedPayload.data.topic.toLocaleLowerCase(), no_of_question: parsedPayload.data.no_of_questions });
    // Send availalble questions
    if (topic) {
      const finalResponse = await generateQuestionSession(topic, userEmail, mongoClient);
      await updateTopicCount(topic._id, mongoClient);
      await deductCredits(mongoClient, userEmail);
      return Response.json(finalResponse);
    }

    // Send new generated questions
    const res = await generateGPTQuestions(parsedPayload.data.no_of_questions, parsedPayload.data.topic);
    if (!validateGPTOutput(res)) {
      return Response.json({ message: "GPT generation has failed formating question, please try again later" }, { status: 500 });
    }
    const topicDetails = await insertTopicToDB(parsedPayload.data.topic, parsedPayload.data.no_of_questions, mongoClient);
    const questionsDetails = await insertQuestionToDB(res, topicDetails.insertedId, mongoClient);
    await insertAnswerToDB(res, questionsDetails.insertedIds, topicDetails.insertedId, mongoClient);
    const latestTopic: WithId<TopicDB> | null = await mongoClient.db("trivia-spark-ai").collection("Topics").findOne<TopicDB>({ _id: topicDetails.insertedId });
    const finalResponse = await generateQuestionSession(latestTopic as TopicDB, userEmail, mongoClient);
    await deductCredits(mongoClient, userEmail);
    return Response.json(finalResponse);
  } catch {
    return Response.json({ message: "Question generation has failed, please try again later" }, { status: 500 });
  }
}
