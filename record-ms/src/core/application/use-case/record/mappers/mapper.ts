import type { Record } from "../../../domain/record/entity/record";
import type { RecordMaterials } from "../../../domain/record/entity/record-materials";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class RecordMapper {
  static execute(r: Record) {
    return {
      id: r.id,
      weight: r.weight,
      materialId: r.materialId,
    }
  }
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class RecordMaterialsMapper {
  static execute(r: RecordMaterials) {
    return {
      id: r.id,
      weight: r.weight,
      materials: r.materials.map((m) => ({
        id: m.id,
        name: m.name,
        price: +m.price
      })),
      recordId: r.recordId,
    }
  }
}