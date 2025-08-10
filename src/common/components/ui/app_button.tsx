import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

export interface AppButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        className={cn(className)}
        variant={variant}
        size={size}
        asChild={asChild}
        {...props}
      />
    );
  }
);

AppButton.displayName = "AppButton";
