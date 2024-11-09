import type { Material } from "../../../domain/material/entity/material";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class MaterialMapper {
  static execute(m: Material) {
    return {
      id: m.id,
      name: m.name,
      price: +m.price,
    }
  }
}