import api from "@/api/api";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";
import { motion, useAnimation, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
interface SwipeButtonProps {
  id: number;
  targetContribution: number;
  contributionName: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contribution: number;
  setContribution: React.Dispatch<React.SetStateAction<number>>;
  onOnce: () => void;
}

export const SwipeButton: React.FC<SwipeButtonProps> = ({
  id,
  targetContribution,
  contributionName,
  setOpen,
  contribution,
  setContribution,
  onOnce,
}) => {
  const { sendDonation } = api;
  const constraintsRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [swipedToEnd, setSwipedToEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const controls = useDragControls();
  const animationControls = useAnimation();

  useEffect(() => {
    if (constraintsRef.current) {
      setContainerWidth(constraintsRef.current.offsetWidth);
    }
  }, []);

  const interpolateColor = (
    color1: string,
    color2: string,
    progress: number
  ) => {
    const factor = Math.min(1, Math.max(0, progress)); // Asegurar que el progreso esté entre 0 y 1

    const interpolateChannel = (channel1: number, channel2: number) => {
      const interpolatedChannel = Math.round(
        channel1 + factor * (channel2 - channel1)
      );
      return Math.min(255, Math.max(0, interpolatedChannel));
    };

    const interpolateHex = (hex1: string, hex2: string) => {
      const channel1 = parseInt(hex1, 16);
      const channel2 = parseInt(hex2, 16);
      const interpolatedChannel = interpolateChannel(channel1, channel2);
      return interpolatedChannel.toString(16).padStart(2, "0");
    };

    const r1 = color1.slice(1, 3);
    const g1 = color1.slice(3, 5);
    const b1 = color1.slice(5, 7);

    const r2 = color2.slice(1, 3);
    const g2 = color2.slice(3, 5);
    const b2 = color2.slice(5, 7);

    const interpolatedR = interpolateHex(r1, r2);
    const interpolatedG = interpolateHex(g1, g2);
    const interpolatedB = interpolateHex(b1, b2);
    return `#${interpolatedR}${interpolatedG}${interpolatedB}`;
  };

  return (
    <motion.div
      className="max-sm:flex md:hidden items-center justify-start h-16 w-80 rounded-full overflow-hidden mx-auto"
      ref={constraintsRef}
      animate={{
        backgroundColor: interpolateColor("#FF69B4", "#4682B4", progress),
      }}
    >
      <span
        className={cn(
          "absolute text-2xl font-bold left-1/2 transform -translate-x-1/2",
          swipedToEnd ? "text-slate-100" : "text-slate-100"
        )}
      >
        {swipedToEnd ? "¡Gracias!" : "Enviar"}
      </span>
      <motion.div
        className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full"
        drag="x"
        dragControls={controls}
        dragConstraints={constraintsRef}
        dragElastic={0.005}
        onDrag={(_, info) => {
          if (containerWidth !== null) {
            const progress = info.point.x / containerWidth;
            setProgress(progress);
          }
        }}
        onDragEnd={async (event, info) => {
          if (containerWidth !== null) {
            if (info.point.x > containerWidth - 100) {
              // Si está cerca del final, anima al final y cambia el ícono a Check
              await Promise.all([
                animationControls.start({ x: containerWidth - 60 }),
              ]);
              setSwipedToEnd(true);
              setProgress(1);
              sendDonation(id, targetContribution, contributionName).then(
                () => {
                  onOnce();
                  setContribution(targetContribution + contribution);
                  setTimeout(() => {
                    setOpen(false);
                  }, 1000);
                }
              );
            } else {
              // Si no está en el final, anima de vuelta al inicio y restaura el ícono original
              await Promise.all([animationControls.start({ x: 0 })]);
              setSwipedToEnd(false);
              setProgress(0);
            }
          }
        }}
        animate={animationControls}
      >
        {swipedToEnd ? (
          <>
            <CheckIcon className="h-8 w-8" />
          </>
        ) : (
          <>
            <ArrowRightIcon className="h-8 w-8" />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
