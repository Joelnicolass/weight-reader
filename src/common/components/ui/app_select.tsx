import {
  Select as ShadcnSelect,
  SelectContent as ShadcnSelectContent,
  SelectGroup as ShadcnSelectGroup,
  SelectItem as ShadcnSelectItem,
  SelectLabel as ShadcnSelectLabel,
  SelectScrollDownButton as ShadcnSelectScrollDownButton,
  SelectScrollUpButton as ShadcnSelectScrollUpButton,
  SelectSeparator as ShadcnSelectSeparator,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
} from "@/components/ui/select";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppSelectProps
  extends React.ComponentProps<typeof ShadcnSelect> {}

export const AppSelect = ({ ...props }: AppSelectProps) => {
  return <ShadcnSelect {...props} />;
};

export const AppSelectTrigger = forwardRef<
  React.ComponentRef<typeof ShadcnSelectTrigger>,
  React.ComponentProps<typeof ShadcnSelectTrigger>
>(({ className, children, ...props }, ref) => {
  return (
    <ShadcnSelectTrigger ref={ref} className={cn(className)} {...props}>
      {children}
    </ShadcnSelectTrigger>
  );
});

export const AppSelectContent = forwardRef<
  React.ComponentRef<typeof ShadcnSelectContent>,
  React.ComponentProps<typeof ShadcnSelectContent>
>(({ className, children, position = "popper", ...props }, ref) => {
  return (
    <ShadcnSelectContent
      ref={ref}
      className={cn(className)}
      position={position}
      {...props}
    >
      {children}
    </ShadcnSelectContent>
  );
});

export const AppSelectValue = forwardRef<
  React.ComponentRef<typeof ShadcnSelectValue>,
  React.ComponentProps<typeof ShadcnSelectValue>
>(({ ...props }, ref) => {
  return <ShadcnSelectValue ref={ref} {...props} />;
});

export const AppSelectItem = forwardRef<
  React.ComponentRef<typeof ShadcnSelectItem>,
  React.ComponentProps<typeof ShadcnSelectItem>
>(({ className, children, ...props }, ref) => {
  return (
    <ShadcnSelectItem ref={ref} className={cn(className)} {...props}>
      {children}
    </ShadcnSelectItem>
  );
});

export const AppSelectGroup = ShadcnSelectGroup;
export const AppSelectLabel = ShadcnSelectLabel;
export const AppSelectSeparator = ShadcnSelectSeparator;
export const AppSelectScrollUpButton = ShadcnSelectScrollUpButton;
export const AppSelectScrollDownButton = ShadcnSelectScrollDownButton;

AppSelect.displayName = "AppSelect";
AppSelectTrigger.displayName = "AppSelectTrigger";
AppSelectContent.displayName = "AppSelectContent";
AppSelectValue.displayName = "AppSelectValue";
AppSelectItem.displayName = "AppSelectItem";
