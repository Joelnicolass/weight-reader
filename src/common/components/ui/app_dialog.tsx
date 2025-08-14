import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppDialogProps extends React.ComponentProps<typeof Dialog> {}

export const AppDialog = Dialog;

export interface AppDialogTriggerProps
  extends React.ComponentProps<typeof DialogTrigger> {}

export const AppDialogTrigger = forwardRef<
  React.ElementRef<typeof DialogTrigger>,
  AppDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <DialogTrigger
      ref={ref}
      className={cn("transition-all duration-150", className)}
      {...props}
    />
  );
});

AppDialogTrigger.displayName = "AppDialogTrigger";

export interface AppDialogContentProps
  extends React.ComponentProps<typeof DialogContent> {}

export const AppDialogContent = forwardRef<
  React.ElementRef<typeof DialogContent>,
  AppDialogContentProps
>(({ className, ...props }, ref) => {
  return (
    <DialogContent
      ref={ref}
      className={cn(
        "animate-in fade-in-50 slide-in-from-bottom-2 duration-300",
        className
      )}
      {...props}
    />
  );
});

AppDialogContent.displayName = "AppDialogContent";

export interface AppDialogHeaderProps
  extends React.ComponentProps<typeof DialogHeader> {}

export const AppDialogHeader = forwardRef<HTMLDivElement, AppDialogHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogHeader
        ref={ref}
        className={cn("space-y-3", className)}
        {...props}
      />
    );
  }
);

AppDialogHeader.displayName = "AppDialogHeader";

export interface AppDialogFooterProps
  extends React.ComponentProps<typeof DialogFooter> {}

export const AppDialogFooter = forwardRef<HTMLDivElement, AppDialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogFooter ref={ref} className={cn("gap-3", className)} {...props} />
    );
  }
);

AppDialogFooter.displayName = "AppDialogFooter";

export interface AppDialogTitleProps
  extends React.ComponentProps<typeof DialogTitle> {}

export const AppDialogTitle = forwardRef<
  React.ElementRef<typeof DialogTitle>,
  AppDialogTitleProps
>(({ className, ...props }, ref) => {
  return (
    <DialogTitle
      ref={ref}
      className={cn("text-xl font-semibold", className)}
      {...props}
    />
  );
});

AppDialogTitle.displayName = "AppDialogTitle";

export interface AppDialogDescriptionProps
  extends React.ComponentProps<typeof DialogDescription> {}

export const AppDialogDescription = forwardRef<
  React.ElementRef<typeof DialogDescription>,
  AppDialogDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <DialogDescription
      ref={ref}
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
});

AppDialogDescription.displayName = "AppDialogDescription";

export const AppDialogClose = DialogClose;
export const AppDialogOverlay = DialogOverlay;
export const AppDialogPortal = DialogPortal;
