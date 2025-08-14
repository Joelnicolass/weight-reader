import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppPopoverProps extends React.ComponentProps<typeof Popover> {}

export const AppPopover = Popover;

export interface AppPopoverTriggerProps
  extends React.ComponentProps<typeof PopoverTrigger> {}

export const AppPopoverTrigger = forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  AppPopoverTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <PopoverTrigger
      ref={ref}
      className={cn("transition-all duration-150", className)}
      {...props}
    />
  );
});

AppPopoverTrigger.displayName = "AppPopoverTrigger";

export interface AppPopoverContentProps
  extends React.ComponentProps<typeof PopoverContent> {}

export const AppPopoverContent = forwardRef<
  React.ElementRef<typeof PopoverContent>,
  AppPopoverContentProps
>(({ className, ...props }, ref) => {
  return (
    <PopoverContent
      ref={ref}
      className={cn(
        "animate-in fade-in-50 slide-in-from-top-2 duration-200",
        className
      )}
      {...props}
    />
  );
});

AppPopoverContent.displayName = "AppPopoverContent";

export interface AppPopoverAnchorProps
  extends React.ComponentProps<typeof PopoverAnchor> {}

export const AppPopoverAnchor = forwardRef<
  React.ElementRef<typeof PopoverAnchor>,
  AppPopoverAnchorProps
>(({ className, ...props }, ref) => {
  return <PopoverAnchor ref={ref} className={className} {...props} />;
});

AppPopoverAnchor.displayName = "AppPopoverAnchor";
