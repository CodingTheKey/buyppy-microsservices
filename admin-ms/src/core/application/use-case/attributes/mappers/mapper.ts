import { Attribute } from "../../../../domain/product/value-objects/attribute";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AttributesMapper {
  static execute(a: Attribute) {
    return {
      id: a.id,
      key: a.key,
    }
  }
}
