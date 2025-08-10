import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperContextValue {
  currentStep: number;
  totalSteps: number;
}

const StepperContext = React.createContext<StepperContextValue | undefined>(
  undefined
);

function useStepperContext() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
}

function Stepper({
  currentStep,
  totalSteps,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <StepperContext.Provider value={{ currentStep, totalSteps }}>
      <div
        data-slot="stepper"
        className={cn("flex items-center", className)}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}

function StepperStep({
  step,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  step: number;
}) {
  const { currentStep } = useStepperContext();
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div
      data-slot="stepper-step"
      data-active={isActive}
      data-completed={isCompleted}
      className={cn("flex items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function StepperStepIndicator({
  step,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  step: number;
}) {
  const { currentStep } = useStepperContext();
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div
      data-slot="stepper-step-indicator"
      data-active={isActive}
      data-completed={isCompleted}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
        isCompleted
          ? "border-primary bg-primary text-primary-foreground"
          : isActive
          ? "border-primary bg-background text-primary"
          : "border-muted-foreground/25 bg-background text-muted-foreground",
        className
      )}
      {...props}
    >
      {isCompleted ? <Check className="h-4 w-4" /> : <span>{step}</span>}
    </div>
  );
}

function StepperStepTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-step-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

function StepperStepDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-step-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function StepperSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-separator"
      className={cn(
        "flex-1 border-t border-muted-foreground/25 mx-4",
        className
      )}
      {...props}
    />
  );
}

export {
  Stepper,
  StepperStep,
  StepperStepIndicator,
  StepperStepTitle,
  StepperStepDescription,
  StepperSeparator,
};
