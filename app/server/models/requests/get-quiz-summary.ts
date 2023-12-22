import z from "zod";

export const getQuizSummarySchema = z.object({
  completion_id: z.string().min(24),
});

export type GetQuizSummarySchemaT = z.infer<typeof getQuizSummarySchema>;
