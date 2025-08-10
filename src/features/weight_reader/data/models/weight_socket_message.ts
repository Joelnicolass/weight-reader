export interface WeightSocketMessage {
  type: string;
  payload: {
    data: string;
    allowRegister: boolean;
    history: string[];
  };
  timestamp: string;
}
