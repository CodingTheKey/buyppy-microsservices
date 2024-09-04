import { Attribute } from "../value-objects/attribute";

export class AttributeFactory {
  static create(
    id: string,
    key: string,
    value: string,
    stockQuantity: number
  ): Attribute {
    return new Attribute(
      id,
      key,
      value,
      stockQuantity
    )
  }
}