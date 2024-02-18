import { Users } from "@/app/server/models/usersdb";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { auth } from "@/src/auth/auth";
import { MongoClient } from "mongodb";

/**
 * @swagger
 * /api/users/credits:
 *   get:
 *     tags: [Users]
 *     description: Get user available credits
 *
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetUserCreditsResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function GET() {
  const session = await auth();
  const mongoClient: MongoClient = await getMongoClient();
  const userEmail: string = session?.user?.email as string;

  try {
    const dbUser: Users | null = await mongoClient.db("trivia-spark-ai").collection<Users>("Users").findOne({ email: userEmail });
    if (!dbUser) {
      // append user
      const intialCredits: number = 5;
      await mongoClient.db("trivia-spark-ai").collection("Users").insertOne({ credits: intialCredits, email: userEmail, payments: [] });
      return Response.json({ credits: intialCredits });
    }
    return Response.json({ credits: dbUser.credits });
  } catch {
    Response.json({ message: "Couldn't retrive user information at the moment" }, { status: 500 });
  }
}
