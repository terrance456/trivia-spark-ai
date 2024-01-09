import LoginCard from "@/src/components/LoginCard/LoginCard";
import React from "react";

const SignInPage: React.FC = async () => {
  return (
    <section className="container px-3 sm:px-8 h-full flex justify-center items-center">
      <LoginCard />
    </section>
  );
};

export default SignInPage;
