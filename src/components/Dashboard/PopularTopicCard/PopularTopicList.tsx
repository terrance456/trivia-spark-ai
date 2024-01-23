"use client";
import React from "react";
import { GetPopularTopicsDetails, GetPopularTopicsResponseClient } from "@/src/apis/models/response/GetPopularTopicsResponseClient";
import { useGlobalSettingContext } from "@/src/contexts/GlobalSettingContext";
import { StarIcon } from "@radix-ui/react-icons";
import ConfirmModal, { ConfirmModalContent } from "../../ConfirmModal/ConfirmModal";

interface PopularTopicListProps {
  list: GetPopularTopicsResponseClient;
}

const PopularTopicList: React.FC<PopularTopicListProps> = ({ list }: PopularTopicListProps) => {
  const [confirmModalDetails, setConfirmModalDetails] = React.useState<ConfirmModalContent>({ open: false });
  const { generateQuestionHandler } = useGlobalSettingContext();

  const toggleConfirmModal = (value: ConfirmModalContent) => {
    setConfirmModalDetails((prevModal: ConfirmModalContent) => ({ ...prevModal, ...value }));
  };

  const onClickTopic = (item: GetPopularTopicsDetails) => {
    toggleConfirmModal({
      open: true,
      header: "Confirmation",
      content: (
        <>
          You are about to generate <b>{item.no_of_question}</b> questions for <b className="capitalize">{item.topic_name}</b> topic
        </>
      ),
      confirmBtn: {
        onClick: () => {
          toggleConfirmModal({ open: false });
          generateQuestionHandler({ topics: item.topic_name, noOfQuestions: item.no_of_question });
        },
      },
    });
  };

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        {list.map((item: GetPopularTopicsDetails, index: number) => (
          <div key={index} className="flex items-center cursor-pointer py-3" onClick={() => onClickTopic(item)}>
            <StarIcon className="mr-3 h-7 w-7 text-orange-400" />
            <div className="w-full">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">{item.topic_name}</p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">{item.no_of_question} Questions</p>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal {...confirmModalDetails} onOpenChange={(v) => toggleConfirmModal({ open: v })} />
    </>
  );
};

export default PopularTopicList;
