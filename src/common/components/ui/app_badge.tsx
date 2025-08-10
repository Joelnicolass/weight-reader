import { Badge as ShadcnBadge, badgeVariants } from "@/components/ui/badge";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

export interface AppBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export const AppBadge = forwardRef<HTMLSpanElement, AppBadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    return (
      <ShadcnBadge
        ref={ref}
        className={cn(className)}
        variant={variant}
        asChild={asChild}
        {...props}
      />
    );
  }
);

AppBadge.displayName = "AppBadge";
