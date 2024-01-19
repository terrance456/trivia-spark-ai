import React, { ReactNode } from "react";
import { Card, CardContent } from "../../ui/card";
import Banner from "../../Banner/Banner";

interface ErrorCardProps {
  text: ReactNode;
}

const CardError: React.FC<ErrorCardProps> = ({ text }: ErrorCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <Banner variant="secondary">
          Something went wrong with your <b>{text}</b>, please try again later
        </Banner>
      </CardContent>
    </Card>
  );
};

export default CardError;
