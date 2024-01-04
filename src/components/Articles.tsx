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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

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
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="default">Contribuir Ahora</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-lg font-semibold">
                ¡Gracias!
              </DrawerTitle>
              <DrawerDescription className="text-sm">
                Tu contribución nos ayudará a comprar los artefactos para
                nuestro nuevo hogar.
              </DrawerDescription>
              <div className="flex items-center justify-center flex-col gap-2">
                <p className="text-sm font-semibold">Alias: matiaspalomo.bru</p>
                <p className="text-sm font-semibold">
                  CBU: 1430001713018570320011
                </p>
                <img
                  className="w-48 h-48 border border-primary rounded-lg p-2"
                  src="/qr1.png"
                  alt="QR"
                />
              </div>
            </DrawerHeader>
            <div className="p-4 pb-0 my-5">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  disabled={goal <= 200}
                >
                  <MinusIcon className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    $ {goal}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Pesos
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  disabled={goal >= 400}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
};
export default Articles;
