"use client";
import React from "react";
import { GetQuestionResponseClient } from "@/src/apis/models/response/GetQuestionResponseClient";
import { Button } from "@/src/components/ui/button";
import QuestionAnswer from "./QuestionAnswer";
import { nextFetch } from "@/src/apis/fetch";
import { ApiRoutes } from "@/src/apis/routes.enum";
import { useRouter } from "next/navigation";
import { CompleteQuizResponseClient } from "@/src/apis/models/response/CompleteQuizResponseClient";
import { useGlobalSettingContext } from "@/src/contexts/GlobalSettingContext";
import Timer from "@/src/components/Timer/Timer";

interface QuestionAnswerSectionProps {
  details: GetQuestionResponseClient;
}

const QuestionAnswerSection: React.FC<QuestionAnswerSectionProps> = ({ details }: QuestionAnswerSectionProps) => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | undefined>(details.user_answer_id || undefined);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isQuestionDisabled, setIsQuestionDisabled] = React.useState<boolean>(false);
  const { toggleInfoModal } = useGlobalSettingContext();

  const onChangeAnswer = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const onNext = async () => {
    if (isQuestionDisabled) {
      return;
    }
    if (!selectedAnswer) {
      toggleInfoModal({ open: true, header: "Validation error", content: "Please select an answer in the option given." });
      return;
    }
    setIsSubmitting(true);
    if (!(await submitAnswer())) {
      setIsSubmitting(false);
      return;
    }
    if (!details.next_question_id) {
      await endQuizSubmission();
      setIsSubmitting(false);
      return;
    }
    router.push(`/question?topic_id=${details.topic_id}&session_id=${details._id}&question_id=${details.next_question_id}`);
    router.refresh();
    setIsSubmitting(false);
  };

  const onBack = () => {
    if (details.prev_question_id) {
      router.push(`/question?topic_id=${details.topic_id}&session_id=${details._id}&question_id=${details.prev_question_id}`);
      router.refresh();
      return;
    }
    return router.push("/");
  };

  const submitAnswer = async () => {
    try {
      const body: string = JSON.stringify({ question_id: details.question._id, session_id: details._id, topic_id: details.topic_id, answer_id: selectedAnswer });
      await nextFetch(ApiRoutes.submitQuestion, { method: "POST", body }, false);
      return true;
    } catch (error: any) {
      toggleInfoModal({ open: true, header: "Unexpected error", content: error.message });
      return false;
    }
  };

  const endQuizSubmission = async () => {
    try {
      const body: string = JSON.stringify({ session_id: details._id });
      const response: CompleteQuizResponseClient = await nextFetch(ApiRoutes.completeQuiz, { method: "POST", body }, false);
      console.log(response);
      // TODO: forward to history page
    } catch (error: any) {
      toggleInfoModal({ open: true, header: "Unexpected error", content: error.message });
    }
  };

  const showTimeEndedModal = () => {
    setIsQuestionDisabled(true);
    toggleInfoModal({
      open: true,
      header: "Time up",
      content: "Quiz time has ended, please retake the quiz.",
      preventBackdropClose: true,
      onClose: () => {
        // router.push("/");
      },
    });
  };

  React.useEffect(() => {
    setSelectedAnswer(details.user_answer_id);
  }, [details]);

  return (
    <section className="container px-6 lg:px-16 pb-0 flex-1 flex flex-col">
      <div className="flex justify-end mt-4">
        <p className="flex items-center text-sm text-slate-500 dark:text-slate-300 font-semibold">
          <Timer timerDuration={10} startTimer={new Date(details.started_at)} onEnd={showTimeEndedModal} />
        </p>
      </div>
      <div className="mt-14 flex-1">
        <QuestionAnswer disabled={isSubmitting || isQuestionDisabled} question={details.question} answers={details.answers} onChangeAnswer={onChangeAnswer} questionNo={details.question_no} selectedAnswer={selectedAnswer} />
      </div>
      <div className="flex justify-between sm:flex-row flex-col bg-background py-5 sm:py-8 sticky bottom-0 left-0">
        <Button className="sm:w-[150px] mb-3 sm:mb-0" variant="secondary" onClick={onBack} disabled={isQuestionDisabled}>
          {details.prev_question_id ? "Back" : "Back to Home"}
        </Button>
        <Button className="sm:w-[150px]" onClick={onNext} isLoading={isSubmitting} disabled={isQuestionDisabled}>
          {details.next_question_id ? "Next" : "Submit"}
        </Button>
      </div>
    </section>
  );
};

export default QuestionAnswerSection;
