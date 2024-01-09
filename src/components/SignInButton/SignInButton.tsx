"use client";
import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const SignInButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const searchParams = useSearchParams();
  return <Button variant="outline" onClick={() => signIn("google", { callbackUrl: (searchParams.get("callbackUrl") as string) || "/" })} {...props} />;
};

export default SignInButton;
