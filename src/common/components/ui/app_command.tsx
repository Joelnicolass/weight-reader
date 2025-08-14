import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";

export interface AppCommandProps
  extends React.ComponentProps<typeof CommandPrimitive> {}

export const AppCommand = forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  AppCommandProps
>(({ className, ...props }, ref) => {
  return (
    <Command
      ref={ref}
      className={cn("border rounded-lg shadow-md", className)}
      {...props}
    />
  );
});

AppCommand.displayName = "AppCommand";

export interface AppCommandDialogProps
  extends React.ComponentProps<typeof CommandDialog> {}

export const AppCommandDialog = ({
  className,
  ...props
}: AppCommandDialogProps) => {
  return (
    <CommandDialog
      className={cn("animate-in fade-in-50 duration-300", className)}
      {...props}
    />
  );
};

AppCommandDialog.displayName = "AppCommandDialog";

export interface AppCommandInputProps
  extends React.ComponentProps<typeof CommandInput> {}

export const AppCommandInput = forwardRef<
  React.ElementRef<typeof CommandInput>,
  AppCommandInputProps
>(({ className, ...props }, ref) => {
  return <CommandInput ref={ref} className={cn(className)} {...props} />;
});

AppCommandInput.displayName = "AppCommandInput";

export interface AppCommandListProps
  extends React.ComponentProps<typeof CommandList> {}

export const AppCommandList = forwardRef<
  React.ElementRef<typeof CommandList>,
  AppCommandListProps
>(({ className, ...props }, ref) => {
  return <CommandList ref={ref} className={cn("p-2", className)} {...props} />;
});

AppCommandList.displayName = "AppCommandList";

export interface AppCommandEmptyProps
  extends React.ComponentProps<typeof CommandEmpty> {}

export const AppCommandEmpty = forwardRef<
  React.ElementRef<typeof CommandEmpty>,
  AppCommandEmptyProps
>(({ className, ...props }, ref) => {
  return (
    <CommandEmpty
      ref={ref}
      className={cn("text-muted-foreground py-8", className)}
      {...props}
    />
  );
});

AppCommandEmpty.displayName = "AppCommandEmpty";

export interface AppCommandGroupProps
  extends React.ComponentProps<typeof CommandGroup> {}

export const AppCommandGroup = forwardRef<
  React.ElementRef<typeof CommandGroup>,
  AppCommandGroupProps
>(({ className, ...props }, ref) => {
  return (
    <CommandGroup ref={ref} className={cn("mb-2", className)} {...props} />
  );
});

AppCommandGroup.displayName = "AppCommandGroup";

export interface AppCommandItemProps
  extends React.ComponentProps<typeof CommandItem> {}

export const AppCommandItem = forwardRef<
  React.ElementRef<typeof CommandItem>,
  AppCommandItemProps
>(({ className, ...props }, ref) => {
  return (
    <CommandItem
      ref={ref}
      className={cn(
        "transition-colors duration-150 hover:bg-accent/50",
        className
      )}
      {...props}
    />
  );
});

AppCommandItem.displayName = "AppCommandItem";

export interface AppCommandSeparatorProps
  extends React.ComponentProps<typeof CommandSeparator> {}

export const AppCommandSeparator = forwardRef<
  React.ElementRef<typeof CommandSeparator>,
  AppCommandSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <CommandSeparator ref={ref} className={cn("my-2", className)} {...props} />
  );
});

AppCommandSeparator.displayName = "AppCommandSeparator";

export interface AppCommandShortcutProps
  extends React.ComponentProps<typeof CommandShortcut> {}

export const AppCommandShortcut = forwardRef<
  HTMLSpanElement,
  AppCommandShortcutProps
>(({ className, ...props }, ref) => {
  return (
    <CommandShortcut
      ref={ref}
      className={cn("opacity-70", className)}
      {...props}
    />
  );
});

AppCommandShortcut.displayName = "AppCommandShortcut";
