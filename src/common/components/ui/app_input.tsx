import { Input as ShadcnInput } from "@/components/ui/input";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppInputProps extends React.ComponentProps<"input"> {}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <ShadcnInput ref={ref} type={type} className={cn(className)} {...props} />
    );
  }
);

AppInput.displayName = "AppInput";
