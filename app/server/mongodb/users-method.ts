import { MongoClient } from "mongodb";
import Stripe from "stripe";

export function productCredits(list: Stripe.Product[], productId: string) {
  const currentProduct: Stripe.Product | undefined = list.find((item: Stripe.Product) => item.default_price === productId);
  switch (currentProduct?.metadata.product_id) {
    case "501": {
      return 100;
    }
    case "502": {
      return 50;
    }
  }
}

export function deductCredits(mongoClient: MongoClient, email: string) {
  return mongoClient
    .db("trivia-spark-ai")
    .collection("Users")
    .findOneAndUpdate({ email }, { $inc: { credits: -1 } });
}
