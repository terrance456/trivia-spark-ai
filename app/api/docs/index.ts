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
 *    GetQuestionResponse:
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
 *          answers:
 *            type: array
 *            items:
 *              type: object
 *              $ref: "#/components/schemas/Answer"
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
 *          question_id:
 *            type: string
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
 *            topic_name:
 *              type: string
 *            no_of_question:
 *              type: number
 *            started_at:
 *              type: number
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
 *
 *    FinalSummaryQuestionAnswerModel:
 *      type: object
 *      properties:
 *         question_id:
 *          type: string
 *         question_title:
 *          type: string
 *         user_answer_id:
 *          type: string
 *         answer_id:
 *          type: string
 *         asnwers:
 *          type: array
 *          items:
 *            $ref: "#/components/schemas/Answer"
 *
 *    GetQuizSummaryModel:
 *      type: object
 *      properties:
 *          _id:
 *           type: string
 *          questions:
 *           type: array
 *           items:
 *              $ref: "#/components/schemas/FinalSummaryQuestionAnswerModel"
 *          started_at:
 *           type: number
 *          completed_at:
 *           type: number
 *          topic_name:
 *           type: string
 *          topic_id:
 *           type: string
 *          score:
 *           type: number
 *
 *    GetSummaryListModel:
 *      type: object
 *      properties:
 *          _id:
 *           type: string
 *          no_of_question:
 *           type: number
 *          topic_name:
 *           type: string
 *          score:
 *           type: number
 *
 *    PopularTopicModel:
 *      type: object
 *      properties:
 *          topic_name:
 *           type: string
 *          no_of_question:
 *           type: number
 *
 *    GetQuizSummaryResponse:
 *          $ref: "#/components/schemas/GetQuizSummaryModel"
 *
 *    GetAllQuizSummaryResponse:
 *        type: array
 *        items:
 *          $ref: "#/components/schemas/GetQuizSummaryModel"
 *
 *    GetSummaryListResponse:
 *        type: array
 *        items:
 *          $ref: "#/components/schemas/GetSummaryListModel"
 *    GetPopularTopicModelResponse:
 *        type: array
 *        items:
 *          $ref: "#/components/schemas/PopularTopicModel"
 *
 */
