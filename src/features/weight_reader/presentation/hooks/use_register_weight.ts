import { useState } from "react";
import { Weight } from "../../domain/entities/weight.entity";

export type WeightStep = "tare" | "gross" | "net";

export const useRegisterWeight = () => {
  const [tare, setTare] = useState<Weight>(Weight.zero());
  const [grossWeight, setGrossWeight] = useState<Weight>(Weight.zero());
  const [netWeight, setNetWeight] = useState<Weight>(Weight.zero());
  const [step, setStep] = useState<WeightStep>("tare");

  const registerWeight = (weight: Weight, step: WeightStep) => {
    const handlerMapper = {
      tare: setTare,
      gross: (gross: Weight) => {
        setGrossWeight(gross);
        setNetWeight(Weight.calculateNetWeight(gross, tare));
      },
      net: () => null,
    }[step];
    return handlerMapper(weight);
  };

  const resetWeights = () => {
    setTare(Weight.zero());
    setGrossWeight(Weight.zero());
    setNetWeight(Weight.zero());
  };

  const updateStep = (newStep: WeightStep) => setStep(newStep);

  return {
    step,
    tare,
    grossWeight,
    netWeight,
    updateStep,
    registerWeight,
    resetWeights,
  };
};
