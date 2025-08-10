import { useGetWeight } from "./use_get_weight";
import { useRegisterWeight } from "./use_register_weight";

export const useReaderScreen = () => {
  const { weight } = useGetWeight();
  const {
    step,
    tare,
    netWeight,
    grossWeight,
    updateStep,
    registerWeight,
    resetWeights,
    editTare,
    editGrossWeight,
    editNetWeight,
  } = useRegisterWeight();

  const handleRegisterClick = () => {
    const currentStep = step;

    switch (currentStep) {
      case "tare":
        registerWeight(weight!, "tare");
        updateStep("gross");
        break;
      case "gross":
        registerWeight(weight!, "gross");
        registerWeight(netWeight, "net");
        updateStep("net");
        break;
      case "net":
        updateStep("form");
        break;
      case "form":
        break;
      default:
        break;
    }
  };

  return {
    values: {
      weight,
      tare,
      netWeight,
      grossWeight,
      step,
    },
    actions: {
      handleRegisterClick,
      updateStep,
      registerWeight,
      resetWeights,
      editTare,
      editGrossWeight,
      editNetWeight,
    },
  } as const;
};
