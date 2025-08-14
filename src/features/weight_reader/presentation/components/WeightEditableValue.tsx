import { Edit3, Check, X } from "lucide-react";
import { AppButton, AppInput } from "@/common/components/ui";

interface WeightEditableValueProps {
  label: string;
  value: number;
  isEditing: boolean;
  editValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onValueChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  hideEditButton?: boolean;
  disabled?: boolean;
}

export default function WeightEditableValue({
  label,
  value,
  isEditing,
  editValue,
  inputRef,
  onEdit,
  onSave,
  onCancel,
  onValueChange,
  onKeyDown,
  disabled = false,
  hideEditButton = false,
}: WeightEditableValueProps) {
  return (
    <div className="p-4 bg-secondary rounded-lg border transition-all duration-200 hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">{label}</div>
        {!hideEditButton && !isEditing && (
          <AppButton
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={onEdit}
            disabled={disabled}
          >
            <Edit3 className="h-3 w-3" />
          </AppButton>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-2">
          <AppInput
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={(e) => onValueChange(e.target.value)}
            className="text-center"
            placeholder="0"
            step="0.1"
            min="0"
            onKeyDown={onKeyDown}
          />
          <div className="flex gap-1 justify-center">
            <AppButton
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onSave}
            >
              <Check className="h-3 w-3 text-green-600" />
            </AppButton>
            <AppButton
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onCancel}
            >
              <X className="h-3 w-3 text-red-600" />
            </AppButton>
          </div>
        </div>
      ) : (
        <div className="text-2xl font-bold font-mono text-foreground">
          {value}
        </div>
      )}
    </div>
  );
}
