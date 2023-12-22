/**
 * @swagger
 * components:
 *  schemas:
 *    GenerateQuestionPayload:
 *      type: object
 *      properties:
 *          topic:
 *              type: string
 *          no_of_questions:
 *              type: integer
 *
 *    GenericErrorModel:
 *       type: object
 *       properties:
 *           message:
 *              type: string
 *
 *    Question:
 *      type: object
 *      properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *
 *    Answer:
 *      type: object
 *      properties:
 *         _id:
 *           type: string
 *         answer_title:
 *           type: string
 *
 *    GenerateQuestionResponse:
 *      type: object
 *      properties:
 *          _id:
 *            type: string
 *          started_at:
 *            type: integer
 *          topic_name:
 *            type: string
 *          topic_id:
 *            type: string
 *          next_question_id:
 *            type: string
 *          prev_question_id:
 *            type: string
 *          question:
 *            $ref: "#/components/schemas/Question"
 *          asnwers:
 *            type: array
 *            items:
 *              type: object
 *              $ref: "#/components/schemas/Answer"
 *
 *    GetQuestionPayload:
 *       type: object
 *       properties:
 *          question_id:
 *            type: string
 *          session_id:
 *            type: string
 *          topic_id:
 *            type: string
 *
 *    SubmitQuestionPayload:
 *       type: object
 *       properties:
 *          question_id:
 *            type: string
 *          session_id:
 *            type: string
 *          topic_id:
 *            type: string
 *          answer_id:
 *            type: string
 *
 *    SubmitQuestionResponse:
 *       type: object
 *       properties:
 *          success:
 *            type: string
 *
 *    GetOngoingSessionResponse:
 *       type: array
 *       items:
 *          type: object
 *          properties:
 *            question_id:
 *              type: string
 *            topic_id:
 *              type: string
 *            session_id:
 *              type: string
 *
 *    CompleteQuizPayload:
 *        type: object
 *        properties:
 *          session_id:
 *             type: string
 *
 *    CompleteQuizResponse:
 *        type: object
 *        properties:
 *          completion_id:
 *             type: string
 */
