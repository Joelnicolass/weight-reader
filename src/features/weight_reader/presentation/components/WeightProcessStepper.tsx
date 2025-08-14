import { Package } from "lucide-react";
import {
  AppCard,
  AppCardContent,
  AppCardDescription,
  AppCardHeader,
  AppCardTitle,
  AppButton,
  AppStepper,
  AppStepperStep,
  AppStepperStepIndicator,
  AppStepperStepTitle,
  AppStepperStepDescription,
  AppStepperSeparator,
} from "@/common/components/ui";
import { Weight } from "../../domain/entities/weight.entity";
import WeightEditableValue from "./WeightEditableValue";

type Step = "tare" | "gross" | "net" | "form";

interface WeightProcessStepperProps {
  step: Step;
  weight: Weight | null;
  tare: Weight;
  grossWeight: Weight;
  netWeight: Weight;
  onRegisterClick: () => void;
  // Props para edición
  editingWeight: "tare" | "gross" | "net" | null;
  editValue: string;
  setEditValue: (value: string) => void;
  startEditing: (type: "tare" | "gross" | "net", value: number) => void;
  cancelEditing: () => void;
  saveEdit: (type: "tare" | "gross" | "net") => void;
  handleKeyDown: (
    e: React.KeyboardEvent,
    type: "tare" | "gross" | "net"
  ) => void;
  tareInputRef:
    | React.RefObject<HTMLInputElement>
    | ((element: HTMLInputElement | null) => void);
  grossInputRef:
    | React.RefObject<HTMLInputElement>
    | ((element: HTMLInputElement | null) => void);
  netInputRef:
    | React.RefObject<HTMLInputElement>
    | ((element: HTMLInputElement | null) => void);
}

const STEP_TO_NUMBER_MAP = {
  tare: 1,
  gross: 2,
  net: 3,
  form: 4,
} as const;

const STEP_BUTTON_TEXT_MAP = {
  tare: "Registrar Tara",
  gross: "Registrar Peso Bruto",
  net: "Continuar al Formulario",
} as const;

export default function WeightProcessStepper({
  step,
  tare,
  grossWeight,
  netWeight,
  onRegisterClick,
  editingWeight,
  editValue,
  setEditValue,
  startEditing,
  cancelEditing,
  saveEdit,
  handleKeyDown,
  tareInputRef,
  grossInputRef,
  netInputRef,
}: WeightProcessStepperProps) {
  const getCurrentStepNumber = () => STEP_TO_NUMBER_MAP[step] || 1;
  const getButtonText = () =>
    STEP_BUTTON_TEXT_MAP[step as keyof typeof STEP_BUTTON_TEXT_MAP];

  return (
    <AppCard className="animate-in slide-in-from-top-5 duration-700">
      <AppCardHeader>
        <AppCardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Proceso de Pesaje
        </AppCardTitle>
        <AppCardDescription>
          Siga los pasos para completar el registro
        </AppCardDescription>
      </AppCardHeader>
      <AppCardContent>
        <AppStepper
          currentStep={getCurrentStepNumber()}
          totalSteps={4}
          className="mb-6"
        >
          <AppStepperStep step={1}>
            <AppStepperStepIndicator step={1} />
            <div className="ml-3">
              <AppStepperStepTitle>Registrar Tara</AppStepperStepTitle>
              <AppStepperStepDescription>
                Pese el vehículo vacío
              </AppStepperStepDescription>
            </div>
          </AppStepperStep>
          <AppStepperSeparator />
          <AppStepperStep step={2}>
            <AppStepperStepIndicator step={2} />
            <div className="ml-3">
              <AppStepperStepTitle>Registrar Peso Bruto</AppStepperStepTitle>
              <AppStepperStepDescription>
                Pese el vehículo cargado
              </AppStepperStepDescription>
            </div>
          </AppStepperStep>
          <AppStepperSeparator />
          <AppStepperStep step={3}>
            <AppStepperStepIndicator step={3} />
            <div className="ml-3">
              <AppStepperStepTitle>Calcular Peso Neto</AppStepperStepTitle>
              <AppStepperStepDescription>
                Verificar cálculo automático
              </AppStepperStepDescription>
            </div>
          </AppStepperStep>
          <AppStepperSeparator />
          <AppStepperStep step={4}>
            <AppStepperStepIndicator step={4} />
            <div className="ml-3">
              <AppStepperStepTitle>Completar Formulario</AppStepperStepTitle>
              <AppStepperStepDescription>
                Ingresar datos y finalizar
              </AppStepperStepDescription>
            </div>
          </AppStepperStep>
        </AppStepper>

        {/* Botón de acción principal */}
        <div className="space-y-4">
          {step !== "form" && (
            <AppButton
              onClick={onRegisterClick}
              size="lg"
              className="w-full transition-all duration-200"
            >
              {getButtonText()}
            </AppButton>
          )}

          {/* Resumen de pesos registrados */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Tara */}
            <WeightEditableValue
              label="Tara (kg)"
              value={tare.getValue()}
              isEditing={editingWeight === "tare"}
              editValue={editValue}
              inputRef={tareInputRef as React.RefObject<HTMLInputElement>}
              onEdit={() => startEditing("tare", tare.getValue())}
              onSave={() => saveEdit("tare")}
              onCancel={cancelEditing}
              onValueChange={setEditValue}
              onKeyDown={(e) => handleKeyDown(e, "tare")}
              disabled={editingWeight !== null}
            />

            {/* Peso Bruto */}
            <WeightEditableValue
              label="Peso Bruto (kg)"
              value={grossWeight.getValue()}
              isEditing={editingWeight === "gross"}
              editValue={editValue}
              inputRef={grossInputRef as React.RefObject<HTMLInputElement>}
              onEdit={() => startEditing("gross", grossWeight.getValue())}
              onSave={() => saveEdit("gross")}
              onCancel={cancelEditing}
              onValueChange={setEditValue}
              onKeyDown={(e) => handleKeyDown(e, "gross")}
              disabled={editingWeight !== null}
            />

            {/* Peso Neto */}
            <WeightEditableValue
              label="Peso Neto (kg)"
              value={netWeight.getValue()}
              isEditing={editingWeight === "net"}
              editValue={editValue}
              inputRef={netInputRef as React.RefObject<HTMLInputElement>}
              onEdit={() => startEditing("net", netWeight.getValue())}
              onSave={() => saveEdit("net")}
              onCancel={cancelEditing}
              onValueChange={setEditValue}
              onKeyDown={(e) => handleKeyDown(e, "net")}
              disabled={editingWeight !== null}
            />
          </div>
        </div>
      </AppCardContent>
    </AppCard>
  );
}
