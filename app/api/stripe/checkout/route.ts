import { stripeCheckoutRequestSchema } from "@/app/server/models/requests/stripe-checkout";
import { auth } from "@/src/auth/auth";
import { Session } from "next-auth";
import Stripe from "stripe";

/**
 * @swagger
 * /api/stripe/checkout:
 *   post:
 *     tags: [Stripe]
 *     description: Checkout products and returns checkout url
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CheckoutStripePayload"
 *
 *     responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/CheckoutStripeResponse"
 *        "400":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GenericErrorModel"
 */

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = stripeCheckoutRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return Response.json({ message: "Invalid payload body" }, { status: 400 });
  }

  const stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2023-10-16" });
  const validProduct: Stripe.Product | undefined = (await stripe.products.list()).data.find((v) => v.metadata.product_id === parsedBody.data.product_id);
  if (!validProduct) {
    return Response.json({ message: "Invalid product id" }, { status: 400 });
  }

  const session: Session | null = await auth();
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ quantity: 1, price: validProduct.default_price as string }],
      payment_intent_data: { metadata: { email: session?.user?.email as string, productPrice: validProduct.default_price as string } },
      customer_email: session?.user?.email as string,
      success_url: `${process.env.NEXT_PUBLIC_CLIENT_APIURL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_APIURL}/payment/cancelled`,
      invoice_creation: { enabled: true },
    });
    return Response.json({ url: checkoutSession.url });
  } catch (e: any) {
    return Response.json({ message: "Service unavailable, please try again later" }, { status: 503 });
  }
}
