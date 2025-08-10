import { useSockets } from "../../../../common/hooks/use_sockets";
import { weightMapper } from "../../data/mappers/weight_mapper";
import type { WeightSocketMessage } from "../../data/models/weight_socket_message";

const SOCKET_URL = "ws://127.0.0.1:8765";

export const useGetWeight = () => {
  const { lastJsonMessage } = useSockets<WeightSocketMessage>(SOCKET_URL);
  return { weight: weightMapper(lastJsonMessage) };
};
