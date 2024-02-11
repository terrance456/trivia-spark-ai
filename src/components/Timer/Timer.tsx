"use client";
import { TimerIcon } from "@radix-ui/react-icons";
import React, { MutableRefObject } from "react";

const calculateMinuteSeconds = (timerDuration: number, startTimer: Date) => {
  const msPerSecond: number = 1000;
  const msPerMinute: number = msPerSecond * 60;
  const timeleft: number = new Date(startTimer.getTime() + timerDuration * 60 * 1000).getTime() - Date.now();
  const minutes: number = Math.floor((timeleft % (1000 * 60 * 60)) / msPerMinute);
  const seconds: number = Math.floor((timeleft % (1000 * 60)) / msPerSecond);
  return { minutes: minutes > 0 ? minutes : 0, seconds: seconds > 0 ? seconds : 0 };
};

interface TimerProps {
  startTimer?: Date;
  timerDuration: number; // minutes
  onEnd?: () => void;
}

const Timer: React.FC<TimerProps> = ({ timerDuration, startTimer = new Date(), onEnd }: TimerProps) => {
  const intialTime = calculateMinuteSeconds(timerDuration, startTimer);
  const [formattedMinutes, setFormattedMinutes] = React.useState<string>(String(intialTime.minutes).padStart(2, "0"));
  const [formattedSeconds, setFormattedSeconds] = React.useState<string>(String(intialTime.seconds).padStart(2, "0"));
  const intervalIdRef: MutableRefObject<NodeJS.Timeout | undefined> = React.useRef<NodeJS.Timeout | undefined>();

  React.useEffect(() => {
    if (Number(formattedMinutes) <= 0 && Number(formattedSeconds) <= 0) {
      return;
    }
    intervalIdRef.current = setInterval(() => {
      const { minutes, seconds } = calculateMinuteSeconds(timerDuration, startTimer);
      setFormattedMinutes(String(minutes).padStart(2, "0"));
      setFormattedSeconds(String(seconds).padStart(2, "0"));
    });

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [timerDuration, startTimer]);

  React.useEffect(() => {
    if (Number(formattedMinutes) <= 0 && Number(formattedSeconds) <= 0) {
      clearInterval(intervalIdRef.current);
      onEnd?.();
      return;
    }
  }, [formattedMinutes, formattedSeconds]);

  return (
    <>
      <TimerIcon className="mr-2" /> {formattedMinutes} : {formattedSeconds}
    </>
  );
};

export default React.memo(Timer);
