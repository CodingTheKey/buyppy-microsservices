import { v4 as uuid } from "uuid";
import { Material } from "../entity/material";

export class MaterialFactory {
  static create(
    name: string,
    price: string,
  ): Material {
    return new Material(
      uuid(),
      name,
      price,
    )
  }
}