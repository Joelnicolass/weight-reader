import { useState } from "react";
import { Weight } from "../../domain/entities/weight.entity";

export type WeightStep = "tare" | "gross" | "net" | "form";

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
      form: () => null,
    }[step];
    return handlerMapper(weight);
  };

  const editTare = (value: number) => {
    const newTare = new Weight(new Date().getTime().toString(), value, true);
    setTare(newTare);

    if (grossWeight.getValue() > 0) {
      setNetWeight(Weight.calculateNetWeight(grossWeight, newTare));
    }
  };

  const editGrossWeight = (value: number) => {
    const newGross = new Weight(new Date().getTime().toString(), value, true);
    setGrossWeight(newGross);
    setNetWeight(Weight.calculateNetWeight(newGross, tare));
  };

  const editNetWeight = (value: number) => {
    const newNet = new Weight(new Date().getTime().toString(), value, true);
    setNetWeight(newNet);
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
    editTare,
    editGrossWeight,
    editNetWeight,
  };
};
