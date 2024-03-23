import { generateGPTQuestions } from "@/app/server/gpt/gpt";
import { validateGPTOutput } from "@/app/server/gpt/validate";
import { ProfanityT } from "@/app/server/models/profanity";
import { GenerateQuestionsRequestT, generateQuestionRequestSchema } from "@/app/server/models/requests/generate-questions";
import { generateQuestionSession } from "@/app/server/mongodb/create-session";
import { insertQuestionToDB, insertTopicToDB, insertAnswerToDB, updateTopicCount } from "@/app/server/mongodb/format-question-answer";
import { QuestionDB } from "@/app/server/mongodb/schema/questions.schema";
import { TopicsDB, TopicsSchema } from "@/app/server/mongodb/schema/topics.schema";
import { UserSchema } from "@/app/server/mongodb/schema/users.schema";
import { deductCredits } from "@/app/server/mongodb/users-method";
import { auth } from "@/src/auth/auth";

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
    const userEmail: string = (await auth())?.user?.email as string;
    const dbUser = await UserSchema.findOne({ email: userEmail });
    if (dbUser && dbUser.credits < 1) {
      return Response.json({ message: "Please purchase more credits to generate more quizzes" }, { status: 400 });
    }

    const topic: TopicsDB | null = await TopicsSchema.findOne({ topic_name: parsedPayload.data.topic.toLocaleLowerCase(), no_of_question: parsedPayload.data.no_of_questions });
    // Send availalble questions
    if (topic) {
      const finalResponse = await generateQuestionSession(topic, userEmail);
      await updateTopicCount(topic._id);
      await deductCredits(userEmail);
      return Response.json(finalResponse);
    }

    // Send new generated questions
    const res = await generateGPTQuestions(parsedPayload.data.no_of_questions, parsedPayload.data.topic);
    if (!validateGPTOutput(res)) {
      return Response.json({ message: "GPT generation has failed formating question, please try again later" }, { status: 500 });
    }
    const topicDetails = await insertTopicToDB(parsedPayload.data.topic, parsedPayload.data.no_of_questions);
    const questionsDetails: QuestionDB[] = await insertQuestionToDB(res, topicDetails._id);
    await insertAnswerToDB(
      res,
      questionsDetails.map((v) => v._id),
      topicDetails._id
    );
    const latestTopic: TopicsDB | null = await TopicsSchema.findOne<TopicsDB>({ _id: topicDetails._id });
    const finalResponse = await generateQuestionSession(latestTopic as TopicsDB, userEmail);
    await deductCredits(userEmail);
    return Response.json(finalResponse);
  } catch {
    return Response.json({ message: "Question generation has failed, please try again later" }, { status: 500 });
  }
}
