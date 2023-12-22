import OpenAI from "openai";

export const openaiHandler: OpenAI = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function generateGPTQuestions(quantity: number = 5, topic: string) {
  const gptResponse: OpenAI.Chat.Completions.ChatCompletion = await openaiHandler.chat.completions.create({
    model: process.env.OPENAI_MODEL_VERSION as string,
    messages: [
      {
        role: "user",
        content: `Give me a ${quantity} question quiz on a topic or context of ${topic}`,
      },
    ],
    functions: [
      {
        name: "get_questions",
        description: `Get questions, answers and correct answer from the topic ${topic}`,
        parameters: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              description: "List of questions",
              items: {
                type: "object",
                properties: {
                  question_title: {
                    type: "string",
                    description: "The name of question",
                  },
                  answers: {
                    type: "array",
                    description: "List of unique available answers, 4 options",
                    items: {
                      type: "string",
                      description: "Unique available answer",
                    },
                  },
                  correct_answer: {
                    type: "number",
                    description: "Provide the index of answer in the answers list",
                  },
                },
                required: ["question_title", "answers", "correct_answer"],
              },
            },
          },
          required: ["questions"],
        },
      },
    ],
    function_call: { name: "get_questions" },
  });

  const functionCall = gptResponse.choices[0].message.function_call;

  try {
    return JSON.parse(functionCall?.arguments || "");
  } catch {
    return {};
  }
}
