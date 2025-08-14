import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppTabsProps extends React.ComponentProps<typeof Tabs> {}

export const AppTabs = forwardRef<React.ElementRef<typeof Tabs>, AppTabsProps>(
  ({ className, ...props }, ref) => {
    return <Tabs ref={ref} className={cn("w-full", className)} {...props} />;
  }
);

AppTabs.displayName = "AppTabs";

export interface AppTabsListProps
  extends React.ComponentProps<typeof TabsList> {}

export const AppTabsList = forwardRef<
  React.ElementRef<typeof TabsList>,
  AppTabsListProps
>(({ className, ...props }, ref) => {
  return (
    <TabsList
      ref={ref}
      className={cn("grid w-full grid-cols-2", className)}
      {...props}
    />
  );
});

AppTabsList.displayName = "AppTabsList";

export interface AppTabsTriggerProps
  extends React.ComponentProps<typeof TabsTrigger> {}

export const AppTabsTrigger = forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  AppTabsTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <TabsTrigger
      ref={ref}
      className={cn("transition-all duration-150 hover:bg-muted/50", className)}
      {...props}
    />
  );
});

AppTabsTrigger.displayName = "AppTabsTrigger";

export interface AppTabsContentProps
  extends React.ComponentProps<typeof TabsContent> {}

export const AppTabsContent = forwardRef<
  React.ElementRef<typeof TabsContent>,
  AppTabsContentProps
>(({ className, ...props }, ref) => {
  return (
    <TabsContent
      ref={ref}
      className={cn("mt-4 space-y-4", className)}
      {...props}
    />
  );
});

AppTabsContent.displayName = "AppTabsContent";
