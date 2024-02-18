import z from "zod";

export const stripeCheckoutRequestSchema = z.object({
  product_id: z.string().min(1).max(3),
});

export type StripeCheckoutRequestSchemaT = z.infer<typeof stripeCheckoutRequestSchema>;
