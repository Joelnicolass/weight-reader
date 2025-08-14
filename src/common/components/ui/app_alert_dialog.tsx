import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppAlertDialogProps
  extends React.ComponentProps<typeof AlertDialog> {}

export const AppAlertDialog = AlertDialog;

export interface AppAlertDialogTriggerProps
  extends React.ComponentProps<typeof AlertDialogTrigger> {}

export const AppAlertDialogTrigger = forwardRef<
  React.ElementRef<typeof AlertDialogTrigger>,
  AppAlertDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogTrigger
      ref={ref}
      className={cn("transition-all duration-150", className)}
      {...props}
    />
  );
});

AppAlertDialogTrigger.displayName = "AppAlertDialogTrigger";

export interface AppAlertDialogContentProps
  extends React.ComponentProps<typeof AlertDialogContent> {}

export const AppAlertDialogContent = forwardRef<
  React.ElementRef<typeof AlertDialogContent>,
  AppAlertDialogContentProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogContent
      ref={ref}
      className={cn(
        "animate-in fade-in-50 slide-in-from-bottom-2 duration-300",
        className
      )}
      {...props}
    />
  );
});

AppAlertDialogContent.displayName = "AppAlertDialogContent";

export interface AppAlertDialogHeaderProps
  extends React.ComponentProps<typeof AlertDialogHeader> {}

export const AppAlertDialogHeader = forwardRef<
  HTMLDivElement,
  AppAlertDialogHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogHeader
      ref={ref}
      className={cn("space-y-3", className)}
      {...props}
    />
  );
});

AppAlertDialogHeader.displayName = "AppAlertDialogHeader";

export interface AppAlertDialogFooterProps
  extends React.ComponentProps<typeof AlertDialogFooter> {}

export const AppAlertDialogFooter = forwardRef<
  HTMLDivElement,
  AppAlertDialogFooterProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogFooter
      ref={ref}
      className={cn("gap-3", className)}
      {...props}
    />
  );
});

AppAlertDialogFooter.displayName = "AppAlertDialogFooter";

export interface AppAlertDialogTitleProps
  extends React.ComponentProps<typeof AlertDialogTitle> {}

export const AppAlertDialogTitle = forwardRef<
  React.ElementRef<typeof AlertDialogTitle>,
  AppAlertDialogTitleProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogTitle
      ref={ref}
      className={cn("text-xl font-semibold", className)}
      {...props}
    />
  );
});

AppAlertDialogTitle.displayName = "AppAlertDialogTitle";

export interface AppAlertDialogDescriptionProps
  extends React.ComponentProps<typeof AlertDialogDescription> {}

export const AppAlertDialogDescription = forwardRef<
  React.ElementRef<typeof AlertDialogDescription>,
  AppAlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogDescription
      ref={ref}
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
});

AppAlertDialogDescription.displayName = "AppAlertDialogDescription";

export interface AppAlertDialogActionProps
  extends React.ComponentProps<typeof AlertDialogAction> {}

export const AppAlertDialogAction = forwardRef<
  React.ElementRef<typeof AlertDialogAction>,
  AppAlertDialogActionProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogAction
      ref={ref}
      className={cn("transition-all duration-150", className)}
      {...props}
    />
  );
});

AppAlertDialogAction.displayName = "AppAlertDialogAction";

export interface AppAlertDialogCancelProps
  extends React.ComponentProps<typeof AlertDialogCancel> {}

export const AppAlertDialogCancel = forwardRef<
  React.ElementRef<typeof AlertDialogCancel>,
  AppAlertDialogCancelProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogCancel
      ref={ref}
      className={cn("transition-all duration-150", className)}
      {...props}
    />
  );
});

AppAlertDialogCancel.displayName = "AppAlertDialogCancel";

export const AppAlertDialogPortal = AlertDialogPortal;
export const AppAlertDialogOverlay = AlertDialogOverlay;
