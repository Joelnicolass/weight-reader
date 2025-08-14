import { forwardRef, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "./app_button";
import {
  AppCommand,
  AppCommandEmpty,
  AppCommandGroup,
  AppCommandInput,
  AppCommandItem,
  AppCommandList,
} from "./app_command";
import {
  AppPopover,
  AppPopoverContent,
  AppPopoverTrigger,
} from "./app_popover";

export interface AppComboBoxOption {
  value: string;
  label: string;
}

export interface AppComboBoxProps {
  options: AppComboBoxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export const AppComboBox = forwardRef<HTMLButtonElement, AppComboBoxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Seleccionar opción...",
      searchPlaceholder = "Buscar...",
      emptyMessage = "No se encontraron opciones.",
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (currentValue: string) => {
      const newValue = currentValue === value ? "" : currentValue;
      onValueChange?.(newValue);
      setOpen(false);
    };

    return (
      <AppPopover open={open} onOpenChange={setOpen}>
        <AppPopoverTrigger asChild>
          <AppButton
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
            disabled={disabled}
            {...props}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </AppButton>
        </AppPopoverTrigger>
        <AppPopoverContent className="w-full p-0">
          <AppCommand>
            <AppCommandInput placeholder={searchPlaceholder} />
            <AppCommandList>
              <AppCommandEmpty>{emptyMessage}</AppCommandEmpty>
              <AppCommandGroup>
                {options.map((option) => (
                  <AppCommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </AppCommandItem>
                ))}
              </AppCommandGroup>
            </AppCommandList>
          </AppCommand>
        </AppPopoverContent>
      </AppPopover>
    );
  }
);

AppComboBox.displayName = "AppComboBox";
