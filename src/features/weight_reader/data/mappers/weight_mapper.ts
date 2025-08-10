import { Weight } from "../../domain/entities/weight.entity";
import type { WeightSocketMessage } from "../models/weight_socket_message";

export const weightMapper = (data: WeightSocketMessage | null): Weight => {
  if (!data) {
    return new Weight("0", 0, false);
  }

  const { payload } = data;

  const id = new Date(data.timestamp).getTime().toString();

  return new Weight(
    id,
    (payload.data && parseFloat(payload.data)) || 0,
    payload.allowRegister
  );
};
