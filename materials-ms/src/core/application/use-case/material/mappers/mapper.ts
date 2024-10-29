import { Material } from "../../../domain/material/entity/material";

export class MaterialMapper {
  static execute(m: Material) {
    return {
      id: m.id,
      name: m.name,
      price: m.price,
    }
  }
}