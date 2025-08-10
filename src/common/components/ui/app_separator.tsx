import { Separator as ShadcnSeparator } from "@/components/ui/separator";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppSeparatorProps
  extends React.ComponentProps<typeof ShadcnSeparator> {}

export const AppSeparator = forwardRef<
  React.ComponentRef<typeof ShadcnSeparator>,
  AppSeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => {
    return (
      <ShadcnSeparator
        ref={ref}
        className={cn(className)}
        orientation={orientation}
        decorative={decorative}
        {...props}
      />
    );
  }
);

AppSeparator.displayName = "AppSeparator";
