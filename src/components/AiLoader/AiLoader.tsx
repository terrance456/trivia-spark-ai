import React from "react";
import LoadingTexts from "@/src/assets/json/loading-texts.json";
import { Progress } from "../ui/progress";

const AiLoader: React.FC = () => {
  const loadingTexts = React.useMemo(() => LoadingTexts.sort((a, b) => Math.random() - 0.5), []);
  const [loadTextIndex, setLoadTextIndex] = React.useState(0);
  const [progress, setProgress] = React.useState<number>(0);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    const textIntevalId: NodeJS.Timeout = setInterval(() => {
      setLoadTextIndex((prevTextLoadIndex: number) => {
        if (prevTextLoadIndex === 9) {
          return 0;
        }
        return prevTextLoadIndex + 1;
      });
    }, 3500);

    const progressInterval: NodeJS.Timeout = setInterval(() => {
      setProgress((prevProgress: number) => {
        if (prevProgress > 100) {
          return 0;
        }
        return prevProgress + Number((Math.random() * 1).toFixed(2));
      });
    }, 200);

    return () => {
      clearInterval(textIntevalId);
      clearInterval(progressInterval);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-[78px] bottom-0 left-0 right-0 flex items-center justify-center bg-background z-10">
      <div className="max-w-[80%] flex justify-center items-center relative">
        <Progress value={progress} className="mb-5 w-[700px] max-w-[100%]" />
        {loadingTexts[loadTextIndex] && <p className="text-center absolute top-[110%]"> {loadingTexts[loadTextIndex]}</p>}
      </div>
    </div>
  );
};

export default AiLoader;
