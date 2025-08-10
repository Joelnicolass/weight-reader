export class Weight {
  private id: string;
  private value: number;
  private isStable: boolean;
  private timestamp: Date;

  constructor(id: string, value: number, isStable: boolean = false) {
    this.id = id;
    this.value = value;
    this.isStable = isStable;
    this.timestamp = new Date();
  }

  getId(): string {
    return this.id;
  }

  getValue(): number {
    return this.value;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  isStableWeight(): boolean {
    return this.isStable;
  }

  static zero(): Weight {
    return new Weight("0", 0, false);
  }

  static calculateNetWeight(gross: Weight, tare: Weight): Weight {
    if (gross.getValue() === 0 || tare.getValue() === 0) {
      return Weight.zero();
    }

    return new Weight(
      new Date().getTime().toString(),
      gross.getValue() - tare.getValue(),
      true
    );
  }
}
