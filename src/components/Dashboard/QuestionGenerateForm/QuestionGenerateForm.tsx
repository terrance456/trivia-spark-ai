"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useGlobalSettingContext } from "@/src/contexts/GlobalSettingContext";

export interface GenerateQuestionForm {
  topics: string;
  noOfQuestions: number;
}

const QuestionGenerateForm: React.FC = () => {
  const { generateQuestionHandler } = useGlobalSettingContext();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    setValue,
  } = useForm<GenerateQuestionForm>({ defaultValues: { noOfQuestions: 4 } });

  const onChangeNoOfQuestions = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.valueAsNumber > 10) {
      setValue("noOfQuestions", 10);
      return;
    }
    if (event.target.valueAsNumber < 4) {
      setValue("noOfQuestions", 4);
      return;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Generate your quizzes with a single click</CardTitle>
        <CardDescription>Precisely tell AI what you wanna be challenged on!</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="generate-question-form" onSubmit={handleSubmit(generateQuestionHandler)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="topics">Topics </Label>
              <Input id="topics" placeholder="e.g Capital cities" {...register("topics", { required: "Please fill the topic" })} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="no-of-questions">No of questions</Label>
              <Input id="no-of-questions" type="number" {...register("noOfQuestions", { onChange: onChangeNoOfQuestions, valueAsNumber: true })} max={10} min={4} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit" form="generate-question-form" disabled={isSubmitting}>
          <CheckCircledIcon className="mr-2" /> Quiz now!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionGenerateForm;
