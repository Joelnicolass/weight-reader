export class WeightRegisterEntity {
  private id: string;
  private weight: number;
  private timestamp: Date;

  constructor(id: string, weight: number, timestamp: Date) {
    this.id = id;
    this.weight = weight;
    this.timestamp = timestamp;
  }

  getId(): string {
    return this.id;
  }

  getWeight(): number {
    return this.weight;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }
}
