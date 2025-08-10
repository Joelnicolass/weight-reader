import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
  CardFooter as ShadcnCardFooter,
  CardAction as ShadcnCardAction,
} from "@/components/ui/card";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppCardProps extends React.ComponentProps<"div"> {}

export const AppCard = forwardRef<HTMLDivElement, AppCardProps>(
  ({ className, ...props }, ref) => {
    return <ShadcnCard ref={ref} className={cn(className)} {...props} />;
  }
);

export const AppCardHeader = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return <ShadcnCardHeader ref={ref} className={cn(className)} {...props} />;
});

export const AppCardTitle = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return <ShadcnCardTitle ref={ref} className={cn(className)} {...props} />;
});

export const AppCardDescription = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <ShadcnCardDescription ref={ref} className={cn(className)} {...props} />
  );
});

export const AppCardContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return <ShadcnCardContent ref={ref} className={cn(className)} {...props} />;
});

export const AppCardFooter = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return <ShadcnCardFooter ref={ref} className={cn(className)} {...props} />;
});

export const AppCardAction = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return <ShadcnCardAction ref={ref} className={cn(className)} {...props} />;
});

AppCard.displayName = "AppCard";
AppCardHeader.displayName = "AppCardHeader";
AppCardTitle.displayName = "AppCardTitle";
AppCardDescription.displayName = "AppCardDescription";
AppCardContent.displayName = "AppCardContent";
AppCardFooter.displayName = "AppCardFooter";
AppCardAction.displayName = "AppCardAction";
