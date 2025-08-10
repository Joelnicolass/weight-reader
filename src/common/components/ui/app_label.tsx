import { Label as ShadcnLabel } from "@/components/ui/label";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppLabelProps
  extends React.ComponentProps<typeof ShadcnLabel> {}

export const AppLabel = forwardRef<
  React.ComponentRef<typeof ShadcnLabel>,
  AppLabelProps
>(({ className, ...props }, ref) => {
  return <ShadcnLabel ref={ref} className={cn(className)} {...props} />;
});

AppLabel.displayName = "AppLabel";
