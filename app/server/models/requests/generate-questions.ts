import z from "zod";

export const generateQuestionRequestSchema = z.object({
  topic: z.string().min(5).max(100),
  no_of_questions: z.number().gte(4).lte(10),
});

export type GenerateQuestionsRequestT = z.infer<typeof generateQuestionRequestSchema>;
