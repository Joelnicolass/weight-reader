import React from "react";
import { cn } from "@/lib/utils";

interface AppStatusIndicatorProps {
  status: "stable" | "unstable" | "inactive";
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusConfig = {
  stable: {
    color: "bg-green-500",
    pulseColor: "bg-green-400",
    textColor: "text-green-700",
    label: "Estable",
  },
  unstable: {
    color: "bg-red-500",
    pulseColor: "bg-red-400",
    textColor: "text-red-700",
    label: "Inestable",
  },
  inactive: {
    color: "bg-gray-400",
    pulseColor: "bg-gray-300",
    textColor: "text-gray-600",
    label: "Inactivo",
  },
};

const sizeConfig = {
  sm: {
    dot: "w-2 h-2",
    pulse: "w-3 h-3",
    text: "text-xs",
  },
  md: {
    dot: "w-3 h-3",
    pulse: "w-4 h-4",
    text: "text-sm",
  },
  lg: {
    dot: "w-4 h-4",
    pulse: "w-5 h-5",
    text: "text-base",
  },
};

export const AppStatusIndicator: React.FC<AppStatusIndicatorProps> = ({
  status,
  label,
  size = "md",
  className,
}) => {
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];
  const shouldPulse = status === "stable" || status === "unstable";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex items-center justify-center p-1">
        {/* Dot principal */}
        <div
          className={cn(
            "rounded-full",
            config.color,
            sizeStyles.dot,
            "relative z-10"
          )}
        />

        {/* Animación de pulso */}
        {shouldPulse && (
          <div
            className={cn(
              "absolute rounded-full",
              config.pulseColor,
              sizeStyles.pulse,
              "animate-ping opacity-75"
            )}
          />
        )}
      </div>

      {/* Texto del estado */}
      <span
        className={cn(
          "font-medium",
          config.textColor,
          sizeStyles.text
        )}
      >
        {label || config.label}
      </span>
    </div>
  );
};

export default AppStatusIndicator;
