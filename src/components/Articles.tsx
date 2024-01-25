import api from "@/api/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types/types";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Pride from "react-canvas-confetti/dist/presets/pride";
import { TConductorInstance } from "react-canvas-confetti/dist/types";
import { SwipeButton } from "./SwipeButton";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface ArticlesProps extends Product {}

const Articles: React.FC<ArticlesProps> = (props) => {
  const { producto, descripcion, precioObjetivo, recaudado, imagenUrl, id } =
    props;
  const { sendDonation } = api;
  const [contribution, setContribution] = useState(0);
  const [contributionName, setContributionName] = useState("");
  const [open, setOpen] = useState(false);
  const [targetContribution, setTargetContribution] = useState(
    precioObjetivo / 2
  );
  const [difference, setDifference] = useState(0);
  const [conductor, setConductor] = useState<TConductorInstance>();
  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor);
  };
  const [soldOut, setSoldOut] = useState(false);

  const onOnce = () => {
    conductor?.run({ speed: 30, duration: 1200 });
  };

  useEffect(() => {
    if (contribution + recaudado >= precioObjetivo) {
      setTargetContribution(0);
    }
    const diferencia = precioObjetivo - (contribution + recaudado);
    // Si la diferencia es menor o igual al umbral, actualiza el targetContribution
    setDifference(diferencia);
  }, [contribution, recaudado, precioObjetivo]);

  useEffect(() => {
    if (contribution + recaudado >= precioObjetivo) {
      setSoldOut(true);
    }
  }, [contribution, recaudado, precioObjetivo]);

  return (
    <Card
      className={cn(
        "max-w-md p-6 grid gap-6 relative",
        soldOut && "opacity-50"
      )}
    >
      {soldOut && (
        <Badge className="absolute top-[30px] -left-2 w-auto h-5 bg-sky-500 z-10">
          Alcanzado
        </Badge>
      )}
      <CardHeader className="items-center space-y-2 p-0 grid text-center">
        <CardTitle className="text-lg">{producto}</CardTitle>
        <CardDescription className="text-xs">{descripcion}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 grid gap-4">
        <div className="flex items-center gap-4 text-sm mx-auto h-auto md:h-80">
          <img
            alt="Donation Image"
            className="aspect-auto rounded-md object-cover border max-w-60"
            src={imagenUrl}
          />
        </div>
        <div className="flex items-center gap-4 text-sm flex-col">
          <div className="flex justify-between w-full">
            <div className="font-medium">
              Objetivo{" "}
              <Badge
                variant={"outline"}
                className="border-purple-600/50 rounded-full"
              >
                ${precioObjetivo}
              </Badge>
            </div>
            <div className="font-medium">
              Recaudado{" "}
              <Badge
                variant={"outline"}
                className="border-rose-600/50 rounded-full"
              >
                ${contribution + recaudado}
              </Badge>
            </div>
          </div>
          <Progress
            value={((contribution + recaudado) / precioObjetivo) * 100}
          />
        </div>
      </CardContent>
      <CardFooter className="text-xs p-0 justify-center">
        <Drawer open={open && !soldOut} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button size="default" className={soldOut ? "" : ""}>
              {soldOut ? "Objetivo alcanzado" : "Contribuir"}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="mx-auto md:text-center gap-4">
              <div className="flex flex-col items-center justify-center space-x-2 md:w-[620px] mx-auto">
                <Input
                  placeholder="Deja tu nombre (Opcional)"
                  className="text-xl font-bold tracking-tighter border md:mx-auto border-slate-600 py-2 focus:ring-ring focus:ring-1 placeholder:font-normal  text-center"
                  value={contributionName}
                  onChange={(e) => setContributionName(e.target.value)}
                />
              </div>
              <div className="mb-2 md:w-2/3 md:mx-auto flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-8 w-8 shrink-0 rounded-full",
                    "active:bg-primary active:text-white"
                  )}
                  disabled={precioObjetivo <= 200 || targetContribution <= 200}
                  onClick={() => {
                    setTargetContribution(targetContribution - 200);
                  }}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">
                  <Input
                    className="text-7xl font-bold tracking-tighter border md:w-full md:mx-auto border-slate-600 text-center py-0 focus:ring-ring focus:ring-1"
                    value={targetContribution}
                    onChange={(e) => setTargetContribution(+e.target.value)}
                    type="number"
                    min="0"
                  />
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Pesos
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-8 w-8 shrink-0 rounded-full",
                    "active:bg-primary active:text-white"
                  )}
                  disabled={targetContribution + recaudado >= precioObjetivo}
                  onClick={() => {
                    setTargetContribution(targetContribution + 200);
                  }}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </DrawerHeader>
            <DrawerDescription className="flex flex-col">
              <span className="text-center font-semibold text-lg text-gray-950">
                ¡Muchas gracias!❤️
              </span>
              <span className="text-center font-semibold text-lg text-gray-950 mx-5">
                Lo siguiente es hacer la transferencia desde tu cuenta bancaria.
              </span>
            </DrawerDescription>
            <div className="flex items-center justify-center flex-col gap-2 my-4 border-2 max-md:w-80 md:w-1/2 mx-auto rounded-xl border-rose-200 py-2">
              <p className="text-lg font-semibold">
                Alias: <span className="text-rose-400">luzorrillo</span>
              </p>
              <p className="text-lg font-semibold">
                CBU:{" "}
                <span className="text-rose-400">1430001713028873250016</span>
              </p>
            </div>
            <p className="text-sm font-semibold text-center">
              Resta contribuir: ${difference}
            </p>
            <Progress
              value={((contribution + recaudado) / precioObjetivo) * 100}
              className="max-md:w-80 md:w-1/2 mx-auto"
            />
            <span className="text-sm font-semibold text-center">
              ${contribution + recaudado} / ${precioObjetivo} -{" "}
              {((contribution + recaudado) / precioObjetivo) * 100}%
            </span>
            <span className="text-center mx-10 text-md pt-4">
              El boton de abajo es solo representativo, no realiza ninguna
              transferencia.
            </span>
            <DrawerFooter className="md:w-1/2 md:mx-auto">
              <Button
                onClick={() => {
                  sendDonation(id, targetContribution, contributionName).then(
                    () => {
                      setContribution(targetContribution + contribution);
                      setOpen(false);
                    }
                  );
                }}
                className="hidden md:block"
              >
                Enviar
              </Button>
              <SwipeButton
                id={id}
                contribution={contribution}
                contributionName={contributionName}
                targetContribution={targetContribution}
                setContribution={setContribution}
                setOpen={setOpen}
                onOnce={onOnce}
              />
              <DrawerClose>Cancelar</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
      <Pride
        onInit={onInit}
        decorateOptions={() => {
          return {
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#FF69B4", "#4682B4"],
          };
        }}
      />
    </Card>
  );
};
export default Articles;
