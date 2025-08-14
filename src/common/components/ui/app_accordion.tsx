import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppAccordionProps {
  className?: string;
  type: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "vertical" | "horizontal";
}

export const AppAccordion = forwardRef<HTMLDivElement, AppAccordionProps>(
  ({ className, ...props }, ref) => {
    return (
      <Accordion
        ref={ref}
        className={cn("w-full", className)}
        type={props.type}
        {...(props as Record<string, unknown>)}
      />
    );
  }
);

AppAccordion.displayName = "AppAccordion";

export interface AppAccordionItemProps
  extends React.ComponentProps<typeof AccordionItem> {}

export const AppAccordionItem = forwardRef<
  React.ElementRef<typeof AccordionItem>,
  AppAccordionItemProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionItem
      ref={ref}
      className={cn("transition-colors duration-200", className)}
      {...props}
    />
  );
});

AppAccordionItem.displayName = "AppAccordionItem";

export interface AppAccordionTriggerProps
  extends React.ComponentProps<typeof AccordionTrigger> {}

export const AppAccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionTrigger>,
  AppAccordionTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionTrigger
      ref={ref}
      className={cn(
        "hover:bg-muted/50 px-3 transition-colors duration-150",
        className
      )}
      {...props}
    />
  );
});

AppAccordionTrigger.displayName = "AppAccordionTrigger";

export interface AppAccordionContentProps
  extends React.ComponentProps<typeof AccordionContent> {}

export const AppAccordionContent = forwardRef<
  React.ElementRef<typeof AccordionContent>,
  AppAccordionContentProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionContent ref={ref} className={cn("px-3", className)} {...props} />
  );
});

AppAccordionContent.displayName = "AppAccordionContent";
