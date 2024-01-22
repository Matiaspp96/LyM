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
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Product } from "@/types/types";
import api from "@/api/api";
import { SwipeButton } from "./SwipeButton";
import Pride from "react-canvas-confetti/dist/presets/pride";
import { TConductorInstance } from "react-canvas-confetti/dist/types";

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
  return (
    <Card className="max-w-md p-6 grid gap-6">
      <CardHeader className="items-center space-y-2 gap-4 p-0">
        <div className="grid gap-1 text-center">
          <CardTitle className="text-lg">{producto}</CardTitle>
          <CardDescription className="text-xs">{descripcion}</CardDescription>
        </div>
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
            <div className="font-medium">Objetivo: ${precioObjetivo}</div>
            <div className="font-medium">
              Recaudado: ${contribution + recaudado}
            </div>
          </div>
          <Progress
            value={((contribution + recaudado) / precioObjetivo) * 100}
          />
        </div>
      </CardContent>
      <CardFooter className="text-xs p-0 justify-center">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button size="default">Contribuir</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="md:w-1/2 mx-auto md:text-center">
              <div className="flex flex-col items-center justify-center space-x-2 mx-10 md:w-2/3 md:mx-auto">
                <Input
                  placeholder="Deja tu nombre (Opcional)"
                  className="text-xl font-bold tracking-tighter border md:w-1/2 md:mx-auto border-slate-600 py-2 focus:ring-ring focus:ring-1 placeholder:font-normal  text-center"
                  value={contributionName}
                  onChange={(e) => setContributionName(e.target.value)}
                />
              </div>
              <div className="mb-2 md:w-1/2 md:mx-auto flex items-center justify-center space-x-2">
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
                    className="text-7xl font-bold tracking-tighter border md:w-1/2 md:mx-auto border-slate-600 text-center py-0 focus:ring-ring focus:ring-1"
                    value={targetContribution}
                    onChange={(e) => setTargetContribution(+e.target.value)}
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
              <p className="text-sm font-semibold text-center">
                Resta contribuir: ${difference}
              </p>
              <Progress
                value={((contribution + recaudado) / precioObjetivo) * 100}
                className="max-md:w-2/3 md:w-1/2 mx-auto"
              />
              <span className="text-sm font-semibold text-center">
                ${contribution + recaudado} / ${precioObjetivo} -{" "}
                {((contribution + recaudado) / precioObjetivo) * 100}%
              </span>
            </DrawerHeader>

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
