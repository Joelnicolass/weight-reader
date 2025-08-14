import { forwardRef } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppLabel } from "./app_label";
import { AppInput } from "./app_input";
import type { AppInputProps } from "./app_input";
import {
  AppSelect,
  AppSelectContent,
  AppSelectTrigger,
  AppSelectValue,
} from "./app_select";
import type { AppSelectProps } from "./app_select";
import { AppComboBox } from "./app_combobox";
import type { AppComboBoxProps, AppComboBoxOption } from "./app_combobox";

interface BaseAppInputFormProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
  touched?: boolean;
  required?: boolean;
  containerClassName?: string;
  rightElement?: ReactNode;
}

interface AppInputFormInputProps extends BaseAppInputFormProps {
  type: "input";
  inputProps?: Omit<AppInputProps, "id">;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

interface AppInputFormSelectProps extends BaseAppInputFormProps {
  type: "select";
  selectProps?: Omit<AppSelectProps, "value" | "onValueChange">;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: ReactNode;
}

interface AppInputFormComboBoxProps extends BaseAppInputFormProps {
  type: "combobox";
  comboBoxProps?: Omit<AppComboBoxProps, "value" | "onValueChange" | "options">;
  options: AppComboBoxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

type AppInputFormProps =
  | AppInputFormInputProps
  | AppInputFormSelectProps
  | AppInputFormComboBoxProps;

export const AppInputForm = forwardRef<
  HTMLInputElement | HTMLButtonElement,
  AppInputFormProps
>(
  (
    {
      id,
      label,
      icon: Icon,
      error,
      touched,
      required,
      containerClassName,
      rightElement,
      type,
      ...props
    },
    ref
  ) => {
    const hasError = touched && error;
    const inputClassName = `transition-all duration-200 ${
      hasError
        ? "border-destructive focus:ring-destructive/20"
        : "focus:ring-primary/20"
    }`;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <AppLabel htmlFor={id} className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {label} {required && "*"}
        </AppLabel>

        <div className={cn("flex items-center gap-2", rightElement && "")}>
          {type === "input" ? (
            <AppInput
              ref={ref as React.Ref<HTMLInputElement>}
              id={id}
              name={id}
              placeholder={(props as AppInputFormInputProps).placeholder}
              onChange={(props as AppInputFormInputProps).onChange}
              onBlur={(props as AppInputFormInputProps).onBlur}
              value={(props as AppInputFormInputProps).value}
              className={cn(
                inputClassName,
                (props as AppInputFormInputProps).inputProps?.className,
                rightElement && "flex-1"
              )}
              {...(props as AppInputFormInputProps).inputProps}
            />
          ) : type === "select" ? (
            <AppSelect
              value={(props as AppInputFormSelectProps).value}
              onValueChange={(props as AppInputFormSelectProps).onValueChange}
              {...(props as AppInputFormSelectProps).selectProps}
            >
              <AppSelectTrigger
                ref={ref as React.Ref<HTMLButtonElement>}
                className={cn(inputClassName, rightElement && "flex-1")}
              >
                <AppSelectValue
                  placeholder={(props as AppInputFormSelectProps).placeholder}
                />
              </AppSelectTrigger>
              <AppSelectContent>
                {(props as AppInputFormSelectProps).children}
              </AppSelectContent>
            </AppSelect>
          ) : (
            <AppComboBox
              ref={ref as React.Ref<HTMLButtonElement>}
              options={(props as AppInputFormComboBoxProps).options}
              value={(props as AppInputFormComboBoxProps).value}
              onValueChange={(props as AppInputFormComboBoxProps).onValueChange}
              placeholder={(props as AppInputFormComboBoxProps).placeholder}
              searchPlaceholder={
                (props as AppInputFormComboBoxProps).searchPlaceholder
              }
              emptyMessage={(props as AppInputFormComboBoxProps).emptyMessage}
              className={cn(inputClassName, rightElement && "flex-1")}
              {...(props as AppInputFormComboBoxProps).comboBoxProps}
            />
          )}

          {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
        </div>

        {hasError && (
          <p className="text-sm text-destructive animate-in slide-in-from-left-2 duration-300">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AppInputForm.displayName = "AppInputForm";
