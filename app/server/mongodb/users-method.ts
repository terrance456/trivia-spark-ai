import Stripe from "stripe";
import { UserSchema } from "./schema/users.schema";

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

export function deductCredits(email: string) {
  return UserSchema.findOneAndUpdate({ email }, { $inc: { credits: -1 } });
}
