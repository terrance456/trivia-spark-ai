"use client";
import React, { PropsWithChildren } from "react";
import AiLoader from "../components/AiLoader/AiLoader";
import InfoModal, { InfoModalProps } from "../components/InfoModal/InfoModal";

interface GlobalSettingContextReturnT {
  showAiLoading: boolean;
  showInfoModal: InfoModalContent;
  toggleAiLoader: (value: boolean) => void;
  toggleInfoModal: (value: InfoModalContent) => void;
}

type InfoModalContent = Omit<InfoModalProps, "onOpenChange">;

export const GlobalSettingContext = React.createContext<GlobalSettingContextReturnT>({} as GlobalSettingContextReturnT);

export const useGlobalSettingContext = () => {
  return React.useContext(GlobalSettingContext);
};

export const GlobalSettingProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [showAiLoading, setShowAiLoading] = React.useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = React.useState<InfoModalContent>({ open: false });

  const toggleAiLoader = (value: boolean) => {
    setShowAiLoading(value);
  };

  const toggleInfoModal = (value: InfoModalContent) => {
    setShowInfoModal((prevModal: InfoModalContent) => ({ ...prevModal, ...value }));
  };

  return (
    <GlobalSettingContext.Provider value={{ showAiLoading, showInfoModal, toggleAiLoader, toggleInfoModal }}>
      {children}
      {showAiLoading && <AiLoader />}
      <InfoModal {...showInfoModal} onOpenChange={(v) => toggleInfoModal({ open: v })} />
    </GlobalSettingContext.Provider>
  );
};
