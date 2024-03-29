import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getMongoClient } from "@/app/server/mongodb/connection";
import { Users } from "@/app/server/models/usersdb";
import { productCredits } from "@/app/server/mongodb/users-method";
import { CollectionName, DBName } from "@/app/server/mongodb/mongodb.enum";
/**
 * @swagger
 * /api/stripe/hook:
 *   post:
 *     tags: [Stripe]
 *     description: Webhook
 *
 */

const stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2023-10-16" });
const endpointSecret: string = process.env.STRIPE_WEBHOOK_KEY as string;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature as string, endpointSecret);

    if (event.type === "payment_intent.succeeded") {
      const payment = event.data.object as Stripe.PaymentIntent;
      const { email, productPrice } = payment.metadata;
      const mongoClient: MongoClient = await getMongoClient();
      const productList: Stripe.Product[] = (await stripe.products.list()).data;

      await mongoClient
        .db(DBName.TRIVIA_SPARK_AI)
        .collection<Users>(CollectionName.USERS)
        .findOneAndUpdate({ email }, { $push: { payments: payment }, $inc: { credits: productCredits(productList, productPrice) } });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
