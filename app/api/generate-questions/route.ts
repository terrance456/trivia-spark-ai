import { generateGPTQuestions } from "@/app/server/gpt/gpt";
import { GenerateQuestionsRequestT, generateQuestionRequestSchema } from "@/app/server/models/requests/generate-questions";
import { TopicDB } from "@/app/server/models/topicdb";
import { mongoClient } from "@/app/server/mongodb/connection";
import { generateQuestionSession } from "@/app/server/mongodb/create-session";
import { insertQuestionToDB, insertTopicToDB, insertAnswerToDB } from "@/app/server/mongodb/format-question-answer";
import { WithId } from "mongodb";

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
    await mongoClient.connect();
    // check db for similar questions
    const topic: WithId<TopicDB> | null = await mongoClient.db("trivia-spark-ai").collection("Topics").findOne<TopicDB>({ topic_name: parsedPayload.data.topic.toLocaleLowerCase() });

    // Send new generated questions
    if (!topic) {
      const res = await generateGPTQuestions(parsedPayload.data.no_of_questions, parsedPayload.data.topic);
      const topicDetails = await insertTopicToDB(parsedPayload.data.topic);
      const questionsDetails = await insertQuestionToDB(res, topicDetails.insertedId);
      await insertAnswerToDB(res, questionsDetails.insertedIds, topicDetails.insertedId);
      const latestTopic: WithId<TopicDB> | null = await mongoClient.db("trivia-spark-ai").collection("Topics").findOne<TopicDB>({ _id: topicDetails.insertedId });
      const finalResponse = await generateQuestionSession(latestTopic as TopicDB);
      mongoClient.close();
      return Response.json(finalResponse);
    }

    // Send availalble questions
    const finalResponse = await generateQuestionSession(topic as TopicDB);
    await mongoClient.close();
    return Response.json(finalResponse);
  } catch (e) {
    console.log(e);
    await mongoClient.close();
    return Response.json({ message: "Question generation has failed, please try again later" }, { status: 500 });
  }
}
