import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface ArticlesProps {
  title: string;
  description: string;
  image: string;
  goal: number;
  current: number;
}

const Articles: React.FC<ArticlesProps> = (props) => {
  const { title, description, image, goal, current } = props;
  return (
    <Card className="max-w-md p-6 grid gap-6">
      <CardHeader className="items-center space-y-2 gap-4 p-0">
        <div className="grid gap-1 text-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0 grid gap-4">
        <div className="flex items-center gap-4 text-sm mx-auto h-80">
          <img
            alt="Donation Image"
            className="aspect-auto rounded-md object-cover border max-w-60"
            src={image}
          />
        </div>
        <div className="flex items-center gap-4 text-sm flex-col">
          <div className="flex justify-between w-full">
            <div className="font-medium">Objetivo: ${goal}</div>
            <div className="font-medium">Recaudado: ${current}</div>
          </div>
          <Progress value={50} />
        </div>
      </CardContent>
      <CardFooter className="text-xs p-0 justify-center">
        <Button size="default">Contribuir Ahora</Button>
      </CardFooter>
    </Card>
  );
};
export default Articles;
