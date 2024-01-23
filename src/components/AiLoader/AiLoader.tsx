import React from "react";
import LoadingTexts from "@/src/assets/json/loading-texts.json";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

export interface AiLoaderProps {
  isDone: boolean;
  onEndCallback?: () => void;
}

const AiLoader: React.FC<AiLoaderProps> = ({ isDone, onEndCallback }) => {
  const loadingTexts = React.useMemo(() => LoadingTexts.sort(() => Math.random() - 0.5), []);
  const [loadTextIndex, setLoadTextIndex] = React.useState(0);
  const [progress, setProgress] = React.useState<number>(0);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    let endLoaderId: NodeJS.Timeout;
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
        if (isDone && onEndCallback) {
          endLoaderId = setTimeout(onEndCallback, 900);
          return 100;
        }

        if (prevProgress > 100) {
          return 0;
        }
        return prevProgress + Number((Math.random() * 1).toFixed(2));
      });
    }, 200);

    return () => {
      clearInterval(textIntevalId);
      clearInterval(progressInterval);
      clearTimeout(endLoaderId);
      document.body.style.overflow = "unset";
    };
  }, [isDone, onEndCallback]);

  return (
    <div className={cn("fixed top-[78px] bottom-0 left-0 right-0 flex items-center justify-center bg-background z-10", { "top-0": window.scrollY > 0 })}>
      <div className="max-w-[80%] flex justify-center items-center relative">
        <Progress value={progress} className="mb-5 w-[700px] max-w-[100%]" />
        {loadingTexts[loadTextIndex] && <p className="text-center absolute top-[110%]"> {loadingTexts[loadTextIndex]}</p>}
      </div>
    </div>
  );
};

export default React.memo(AiLoader);
