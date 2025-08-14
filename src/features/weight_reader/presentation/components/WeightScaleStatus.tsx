import { Scale } from "lucide-react";
import {
  AppCard,
  AppCardContent,
  AppCardHeader,
  AppCardTitle,
  AppStatusIndicator,
} from "@/common/components/ui";
import { Weight } from "../../domain/entities/weight.entity";

interface WeightScaleStatusProps {
  weight: Weight | null;
}

export default function WeightScaleStatus({ weight }: WeightScaleStatusProps) {
  return (
    <AppCard className="border shadow-lg animate-in slide-in-from-top-4 duration-500">
      <AppCardHeader className="pb-3">
        <AppCardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5" />
          Estado de la Balanza
        </AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary font-mono tracking-tight">
              {weight ? weight.getValue() : "---"}
            </div>
            <div className="text-sm text-muted-foreground">
              Peso Actual (kg)
            </div>
          </div>
          <div className="text-center">
            <AppStatusIndicator
              status={
                !weight
                  ? "inactive"
                  : weight.isStableWeight()
                  ? "stable"
                  : "unstable"
              }
              size="lg"
              className="justify-center"
            />
            <div className="text-sm text-muted-foreground mt-2">Estado</div>
          </div>
        </div>
      </AppCardContent>
    </AppCard>
  );
}
