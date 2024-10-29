import { v4 as uuid } from "uuid";
import { Record } from "../entity/record";

export class RecordFactory {
  static create(
    weight: string,
    materialId: string,
  ): Record {
    return new Record(
      uuid(),
      weight,
      materialId,
    )
  }
}