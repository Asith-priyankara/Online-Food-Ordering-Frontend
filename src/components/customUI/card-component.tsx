import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CardComponentProps {
  cardHeader: string;
  cardContentValue: string;
  cardContent: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  cardHeader,
  cardContentValue,
  cardContent,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardHeader}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cardContentValue}</div>
        <p className="text-xs text-muted-foreground">{cardContent}</p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
