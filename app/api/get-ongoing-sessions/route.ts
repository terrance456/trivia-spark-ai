import { QuestionsSessionsDB, QuestionsSessionsSchema } from "@/app/server/mongodb/schema/questions-session.schema";
import { auth } from "@/src/auth/auth";

/**
 * @swagger
 * /api/get-ongoing-sessions:
 *   get:
 *     tags: [Ongoing Sessions]
 *     description: Returns list of ongoing quizez
 *
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetOngoingSessionResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function GET() {
  try {
    const user = await auth();
    const session: Array<QuestionsSessionsDB> = await QuestionsSessionsSchema.find({ user_id: user?.user?.email });

    if (session.length < 1) {
      return Response.json([]);
    }

    const filterSession: Array<QuestionsSessionsDB> = [];
    const removeSession: Array<QuestionsSessionsDB> = [];

    session.forEach((v: QuestionsSessionsDB) => {
      if (v.started_at + 60 * 10 * 1000 >= Date.now()) {
        filterSession.push(v);
        return;
      }
      removeSession.push(v);
    });

    if (removeSession.length > 0) {
      await QuestionsSessionsSchema.deleteMany({ _id: { $in: removeSession.map((v: QuestionsSessionsDB) => v._id) } });
    }

    return Response.json(
      filterSession.map((v: QuestionsSessionsDB) => ({
        question_id: v.questions[0].question_id,
        session_id: v._id,
        topic_id: v.topic_id,
        topic_name: v.topic_name,
        no_of_question: v.questions.length,
        started_at: v.started_at,
      }))
    );
  } catch {
    return Response.json({ message: "Failed to fetch ongoing session" }, { status: 500 });
  }
}
