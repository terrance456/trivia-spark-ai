"use client";
import React, { PropsWithChildren } from "react";
import AiLoader, { AiLoaderProps } from "../components/AiLoader/AiLoader";
import InfoModal, { InfoModalProps } from "../components/InfoModal/InfoModal";
import { GenerateQuestionResponseClient } from "../apis/models/response/GenerateQuestionResponseClient";
import { nextFetch } from "../apis/fetch";
import { ApiRoutes } from "../apis/routes.enum";
import { useRouter } from "next/navigation";
import { GenerateQuestionForm } from "../components/Dashboard/QuestionGenerateForm/QuestionGenerateForm";

interface GlobalSettingContextReturnT {
  showAiLoading: boolean;
  showInfoModal: InfoModalContent;
  toggleAiLoader: (value: boolean) => void;
  toggleInfoModal: (value: InfoModalContent) => void;
  generateQuestionHandler: (value: GenerateQuestionForm) => Promise<void>;
}

type InfoModalContent = Omit<InfoModalProps, "onOpenChange">;

export const GlobalSettingContext = React.createContext<GlobalSettingContextReturnT>({} as GlobalSettingContextReturnT);

export const useGlobalSettingContext = () => {
  return React.useContext(GlobalSettingContext);
};

export const GlobalSettingProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [showAiLoading, setShowAiLoading] = React.useState<boolean>(false);
  const [aiLoaderConfig, setAiLoaderConfig] = React.useState<AiLoaderProps>({ isDone: false });
  const [showInfoModal, setShowInfoModal] = React.useState<InfoModalContent>({ open: false });
  const router = useRouter();

  const toggleAiLoader = (value: boolean, onEnd?: () => void) => {
    if (value) {
      setShowAiLoading(value);
      return;
    }
    setAiLoaderConfig({ isDone: true, onEndCallback: () => onEndAiLoader(onEnd) });
  };

  const onEndAiLoader = (onEnd?: () => void) => {
    setShowAiLoading(false);
    setAiLoaderConfig({ isDone: false });
    onEnd?.();
  };

  const toggleInfoModal = (value: InfoModalContent) => {
    setShowInfoModal((prevModal: InfoModalContent) => ({ ...prevModal, ...value }));
  };

  const generateQuestionHandler = React.useCallback(async (data: GenerateQuestionForm) => {
    toggleAiLoader(true);
    try {
      const response: GenerateQuestionResponseClient = await nextFetch<GenerateQuestionResponseClient>(ApiRoutes.generateQuestion, { method: "POST", body: JSON.stringify({ topic: data.topics, no_of_questions: data.noOfQuestions }) }, false);
      router.push(`/question?topic_id=${response.topic_id}&session_id=${response._id}&question_id=${response.question_id}`);
      router.refresh();
      toggleAiLoader(false);
    } catch (e: any) {
      toggleAiLoader(false, () => {
        toggleInfoModal({ open: true, header: "Unexpected error", content: e.message });
      });
    }
  }, []);

  return (
    <GlobalSettingContext.Provider value={{ showAiLoading, showInfoModal, toggleAiLoader, toggleInfoModal, generateQuestionHandler }}>
      {children}
      {showAiLoading && <AiLoader {...aiLoaderConfig} />}
      <InfoModal {...showInfoModal} onOpenChange={(v) => toggleInfoModal({ open: v })} />
    </GlobalSettingContext.Provider>
  );
};
