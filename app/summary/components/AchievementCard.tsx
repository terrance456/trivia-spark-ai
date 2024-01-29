import React from "react";
import Trophy from "@/src/assets/svgs/trophy.svg";
import { LightningBoltIcon } from "@radix-ui/react-icons";

interface AchievementCardProps {
  score: number;
}

interface AchivementMapperDetails {
  header: string;
  headerContent: string;
  trophyCount: number;
  content: string;
}

interface AchivementMapperT {
  "100": AchivementMapperDetails;
  "80": AchivementMapperDetails;
  "60": AchivementMapperDetails;
  "40": AchivementMapperDetails;
}

const achievementMapper: AchivementMapperT = {
  "100": {
    header: "Excellent!",
    headerContent: "Triumph in a Pursuit of Excellence",
    trophyCount: 5,
    content: "Triumphant champion, victorious winner, trophy-lifting achiever, conquering hero.",
  },
  "80": {
    header: "Proficient!",
    headerContent: "Reached Milestone in Academic Endeavor",
    trophyCount: 4,
    content: "High-achiever, solid performer, commendable accomplishment.",
  },
  "60": {
    header: "Adequate!",
    headerContent: "Surpassed Academic Goals with Determination",
    trophyCount: 3,
    content: "Satisfactory scorer, moderate achievement, passing performance.",
  },
  "40": {
    header: "You can do better!",
    headerContent: "Overcame Challenges, Achieved Significant Progress",
    trophyCount: 1,
    content: "Basic scorer, minimal achievement, room for improvement.",
  },
};

const AchievementCard: React.FC<AchievementCardProps> = (props: AchievementCardProps) => {
  const achievementScore: number = Math.round(props.score);
  const scoreList: number = [40, 60, 80, 100].reduce((prev: number, curr: number) => (Math.abs(curr - achievementScore) < Math.abs(prev - achievementScore) ? curr : prev));
  const item = achievementMapper[String(scoreList) as keyof AchivementMapperT];

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow h-full p-6">
      <p className="font-semibold text-sm mb-3 flex items-center">
        <LightningBoltIcon className="mr-1" /> Achievement
      </p>
      <h2 className="text-2xl font-bold">{item.header}</h2>
      <p className="text-muted-foreground text-sm">{item.headerContent} </p>
      <div className="my-6 flex">
        {Array(item.trophyCount)
          .fill(null)
          .map((_, index: number) => (
            <Trophy key={index} className="max-h-[100px] mx-2" />
          ))}
      </div>
      <p className="text-sm text-muted-foreground">{item.content}</p>
    </div>
  );
};

export default AchievementCard;
