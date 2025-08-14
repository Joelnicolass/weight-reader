import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppDropdownMenuProps
  extends React.ComponentProps<typeof DropdownMenu> {}

export const AppDropdownMenu = DropdownMenu;

export interface AppDropdownMenuTriggerProps
  extends React.ComponentProps<typeof DropdownMenuTrigger> {}

export const AppDropdownMenuTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuTrigger>,
  AppDropdownMenuTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuTrigger
      ref={ref}
      className={cn("transition-all duration-150", className)}
      {...props}
    />
  );
});

AppDropdownMenuTrigger.displayName = "AppDropdownMenuTrigger";

export interface AppDropdownMenuContentProps
  extends React.ComponentProps<typeof DropdownMenuContent> {}

export const AppDropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuContent>,
  AppDropdownMenuContentProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuContent
      ref={ref}
      className={cn(
        "animate-in fade-in-50 slide-in-from-top-2 duration-200",
        className
      )}
      {...props}
    />
  );
});

AppDropdownMenuContent.displayName = "AppDropdownMenuContent";

export interface AppDropdownMenuItemProps
  extends React.ComponentProps<typeof DropdownMenuItem> {}

export const AppDropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  AppDropdownMenuItemProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuItem
      ref={ref}
      className={cn("transition-colors duration-150", className)}
      {...props}
    />
  );
});

AppDropdownMenuItem.displayName = "AppDropdownMenuItem";

export interface AppDropdownMenuLabelProps
  extends React.ComponentProps<typeof DropdownMenuLabel> {}

export const AppDropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuLabel>,
  AppDropdownMenuLabelProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuLabel
      ref={ref}
      className={cn("font-semibold", className)}
      {...props}
    />
  );
});

AppDropdownMenuLabel.displayName = "AppDropdownMenuLabel";

export interface AppDropdownMenuSeparatorProps
  extends React.ComponentProps<typeof DropdownMenuSeparator> {}

export const AppDropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuSeparator>,
  AppDropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return <DropdownMenuSeparator ref={ref} className={className} {...props} />;
});

AppDropdownMenuSeparator.displayName = "AppDropdownMenuSeparator";

export interface AppDropdownMenuCheckboxItemProps
  extends React.ComponentProps<typeof DropdownMenuCheckboxItem> {}

export const AppDropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuCheckboxItem>,
  AppDropdownMenuCheckboxItemProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuCheckboxItem
      ref={ref}
      className={cn("transition-colors duration-150", className)}
      {...props}
    />
  );
});

AppDropdownMenuCheckboxItem.displayName = "AppDropdownMenuCheckboxItem";

export interface AppDropdownMenuRadioItemProps
  extends React.ComponentProps<typeof DropdownMenuRadioItem> {}

export const AppDropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuRadioItem>,
  AppDropdownMenuRadioItemProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuRadioItem
      ref={ref}
      className={cn("transition-colors duration-150", className)}
      {...props}
    />
  );
});

AppDropdownMenuRadioItem.displayName = "AppDropdownMenuRadioItem";

export interface AppDropdownMenuSubTriggerProps
  extends React.ComponentProps<typeof DropdownMenuSubTrigger> {}

export const AppDropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuSubTrigger>,
  AppDropdownMenuSubTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuSubTrigger
      ref={ref}
      className={cn("transition-colors duration-150", className)}
      {...props}
    />
  );
});

AppDropdownMenuSubTrigger.displayName = "AppDropdownMenuSubTrigger";

export interface AppDropdownMenuSubContentProps
  extends React.ComponentProps<typeof DropdownMenuSubContent> {}

export const AppDropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof DropdownMenuSubContent>,
  AppDropdownMenuSubContentProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuSubContent
      ref={ref}
      className={cn(
        "animate-in fade-in-50 slide-in-from-left-2 duration-200",
        className
      )}
      {...props}
    />
  );
});

AppDropdownMenuSubContent.displayName = "AppDropdownMenuSubContent";

// Re-export simple components without modification
export const AppDropdownMenuPortal = DropdownMenuPortal;
export const AppDropdownMenuGroup = DropdownMenuGroup;
export const AppDropdownMenuRadioGroup = DropdownMenuRadioGroup;
export const AppDropdownMenuShortcut = DropdownMenuShortcut;
export const AppDropdownMenuSub = DropdownMenuSub;
