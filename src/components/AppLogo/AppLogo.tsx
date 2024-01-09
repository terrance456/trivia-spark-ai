"use client";
import React from "react";
import LightLogo from "@/src/assets/svgs/logo/logo_light.svg";
import DarkLogo from "@/src/assets/svgs/logo/logo_dark.svg";
import { useTheme } from "next-themes";

const AppLogo: React.FC = () => {
  const { theme } = useTheme();

  if (theme === "dark") {
    return <DarkLogo />;
  }

  return <LightLogo />;
};

export default AppLogo;
