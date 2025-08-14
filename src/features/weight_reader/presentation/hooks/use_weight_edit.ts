import { useState, useCallback } from "react";

export type WeightType = "tare" | "gross" | "net";

// Tipo para las acciones de edición de peso
export interface WeightEditActions {
  editTare: (value: number) => void;
  editGrossWeight: (value: number) => void;
  editNetWeight: (value: number) => void;
}

// Mappers para mejorar legibilidad
const WEIGHT_EDIT_ACTIONS_MAP = {
  tare: (value: number, actions: WeightEditActions) => actions.editTare(value),
  gross: (value: number, actions: WeightEditActions) =>
    actions.editGrossWeight(value),
  net: (value: number, actions: WeightEditActions) =>
    actions.editNetWeight(value),
} as const;

interface UseWeightEditProps {
  editActions: WeightEditActions;
}

export function useWeightEdit({ editActions }: UseWeightEditProps) {
  // Estados para controlar la edición
  const [editingWeight, setEditingWeight] = useState<WeightType | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const startEditing = (weightType: WeightType, currentValue: number) => {
    setEditingWeight(weightType);
    setEditValue(currentValue.toString());
  };

  const cancelEditing = () => {
    setEditingWeight(null);
    setEditValue("");
  };

  const saveEdit = (weightType: WeightType) => {
    const numValue = parseFloat(editValue);
    if (isNaN(numValue) || numValue < 0) {
      alert("Por favor ingrese un valor numérico válido");
      return;
    }

    const editAction = WEIGHT_EDIT_ACTIONS_MAP[weightType];
    if (editAction) {
      editAction(numValue, editActions);
    }

    setEditingWeight(null);
    setEditValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, weightType: WeightType) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit(weightType);
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEditing();
    }
  };

  // Referencias estables usando useCallback
  const tareInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      if (element && editingWeight === "tare") {
        element.focus();
        element.select();
      }
    },
    [editingWeight]
  );

  const grossInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      if (element && editingWeight === "gross") {
        element.focus();
        element.select();
      }
    },
    [editingWeight]
  );

  const netInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      if (element && editingWeight === "net") {
        element.focus();
        element.select();
      }
    },
    [editingWeight]
  );

  return {
    // Estados
    editingWeight,
    editValue,

    // Funciones
    startEditing,
    cancelEditing,
    saveEdit,
    handleKeyDown,
    setEditValue,

    // Referencias
    tareInputRef,
    grossInputRef,
    netInputRef,
  };
}
