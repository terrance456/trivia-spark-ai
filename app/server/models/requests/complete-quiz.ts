import z from "zod";

export const completeQuizRequestSchema = z.object({
  session_id: z.string().min(24),
});

export type CompleteQuizRequestSchemaT = z.infer<typeof completeQuizRequestSchema>;
