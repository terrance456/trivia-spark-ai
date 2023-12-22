import z from "zod";

export const submitQuestionRequestSchema = z.object({
  question_id: z.string().min(24),
  session_id: z.string().min(24),
  answer_id: z.string().min(24),
  topic_id: z.string().min(24),
});

export type SubmitQuestionRequestSchemaT = z.infer<typeof submitQuestionRequestSchema>;
