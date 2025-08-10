import {
  Stepper as ShadcnStepper,
  StepperStep as ShadcnStepperStep,
  StepperStepIndicator as ShadcnStepperStepIndicator,
  StepperStepTitle as ShadcnStepperStepTitle,
  StepperStepDescription as ShadcnStepperStepDescription,
  StepperSeparator as ShadcnStepperSeparator,
} from "@/components/ui/stepper";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppStepperProps
  extends React.ComponentProps<typeof ShadcnStepper> {}

export const AppStepper = forwardRef<
  React.ComponentRef<typeof ShadcnStepper>,
  AppStepperProps
>(({ className, ...props }, ref) => {
  return <ShadcnStepper ref={ref} className={cn(className)} {...props} />;
});

export const AppStepperStep = forwardRef<
  React.ComponentRef<typeof ShadcnStepperStep>,
  React.ComponentProps<typeof ShadcnStepperStep>
>(({ className, children, ...props }, ref) => {
  return (
    <ShadcnStepperStep ref={ref} className={cn(className)} {...props}>
      {children}
    </ShadcnStepperStep>
  );
});

export const AppStepperStepIndicator = forwardRef<
  React.ComponentRef<typeof ShadcnStepperStepIndicator>,
  React.ComponentProps<typeof ShadcnStepperStepIndicator>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnStepperStepIndicator
      ref={ref}
      className={cn(className)}
      {...props}
    />
  );
});

export const AppStepperStepTitle = forwardRef<
  React.ComponentRef<typeof ShadcnStepperStepTitle>,
  React.ComponentProps<typeof ShadcnStepperStepTitle>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnStepperStepTitle ref={ref} className={cn(className)} {...props} />
  );
});

export const AppStepperStepDescription = forwardRef<
  React.ComponentRef<typeof ShadcnStepperStepDescription>,
  React.ComponentProps<typeof ShadcnStepperStepDescription>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnStepperStepDescription
      ref={ref}
      className={cn(className)}
      {...props}
    />
  );
});

export const AppStepperSeparator = forwardRef<
  React.ComponentRef<typeof ShadcnStepperSeparator>,
  React.ComponentProps<typeof ShadcnStepperSeparator>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnStepperSeparator ref={ref} className={cn(className)} {...props} />
  );
});

AppStepper.displayName = "AppStepper";
AppStepperStep.displayName = "AppStepperStep";
AppStepperStepIndicator.displayName = "AppStepperStepIndicator";
AppStepperStepTitle.displayName = "AppStepperStepTitle";
AppStepperStepDescription.displayName = "AppStepperStepDescription";
AppStepperSeparator.displayName = "AppStepperSeparator";
