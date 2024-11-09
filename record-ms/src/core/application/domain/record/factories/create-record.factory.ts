import { v4 as uuid } from "uuid";
import { Record } from "../entity/record";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class RecordFactory {
  static create(
    weight: string,
    materialsIds: string[],
  ): Record {
    return new Record(
      uuid(),
      weight,
      materialsIds,
    )
  }
}