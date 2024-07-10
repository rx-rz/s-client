import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  title: string;
  description: string;
  cardInfo: string | number;
  cardIcon?: ReactNode;
};
export const DashboardCard = ({
  title,
  description,
  cardInfo,
  cardIcon,
}: Props) => {
  return (
    <Card className="h-24  relative border shadow-none rounded-md">
      <CardHeader className="flex justify-between">
        <p className=" text-black block text-2xl font-bold">{cardInfo}</p>
        <p className="font-medium opacity-80">{description}</p>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
