import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppSheetProps extends React.ComponentProps<typeof Sheet> {}

export const AppSheet = Sheet;

export interface AppSheetTriggerProps
  extends React.ComponentProps<typeof SheetTrigger> {}

export const AppSheetTrigger = forwardRef<
  React.ElementRef<typeof SheetTrigger>,
  AppSheetTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <SheetTrigger
      ref={ref}
      className={cn("transition-all duration-150", className)}
      {...props}
    />
  );
});

AppSheetTrigger.displayName = "AppSheetTrigger";

export interface AppSheetContentProps
  extends React.ComponentProps<typeof SheetContent> {}

export const AppSheetContent = forwardRef<
  React.ElementRef<typeof SheetContent>,
  AppSheetContentProps
>(({ className, ...props }, ref) => {
  return <SheetContent ref={ref} className={cn("p-6", className)} {...props} />;
});

AppSheetContent.displayName = "AppSheetContent";

export interface AppSheetHeaderProps
  extends React.ComponentProps<typeof SheetHeader> {}

export const AppSheetHeader = forwardRef<HTMLDivElement, AppSheetHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <SheetHeader
        ref={ref}
        className={cn("space-y-3", className)}
        {...props}
      />
    );
  }
);

AppSheetHeader.displayName = "AppSheetHeader";

export interface AppSheetFooterProps
  extends React.ComponentProps<typeof SheetFooter> {}

export const AppSheetFooter = forwardRef<HTMLDivElement, AppSheetFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <SheetFooter ref={ref} className={cn("gap-3", className)} {...props} />
    );
  }
);

AppSheetFooter.displayName = "AppSheetFooter";

export interface AppSheetTitleProps
  extends React.ComponentProps<typeof SheetTitle> {}

export const AppSheetTitle = forwardRef<
  React.ElementRef<typeof SheetTitle>,
  AppSheetTitleProps
>(({ className, ...props }, ref) => {
  return (
    <SheetTitle
      ref={ref}
      className={cn("text-xl font-semibold", className)}
      {...props}
    />
  );
});

AppSheetTitle.displayName = "AppSheetTitle";

export interface AppSheetDescriptionProps
  extends React.ComponentProps<typeof SheetDescription> {}

export const AppSheetDescription = forwardRef<
  React.ElementRef<typeof SheetDescription>,
  AppSheetDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <SheetDescription
      ref={ref}
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
});

AppSheetDescription.displayName = "AppSheetDescription";

export const AppSheetClose = SheetClose;
