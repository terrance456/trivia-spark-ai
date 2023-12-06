"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const SignInPage: React.FC = () => {
  const searchParams = useSearchParams();

  return (
    <div>
      <button onClick={() => signIn("google", { callbackUrl: (searchParams.get("callbackUrl") as string) || "/" })}>SignIn with google</button>
    </div>
  );
};

export default SignInPage;
