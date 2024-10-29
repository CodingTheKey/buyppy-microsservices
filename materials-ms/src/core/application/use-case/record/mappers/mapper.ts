import { Record } from "../../../domain/record/entity/record";

export class RecordMapper {
  static execute(r: Record) {
    return {
      id: r.id,
      weight: r.weight,
      materialId: r.materialId,
    }
  }
}