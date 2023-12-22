import z from "zod";

export const getQuestionRequestSchema = z.object({
  question_id: z.string().min(24),
  session_id: z.string().min(24),
  topic_id: z.string().min(24),
});

export type GetQuestionRequestSchemaT = z.infer<typeof getQuestionRequestSchema>;
