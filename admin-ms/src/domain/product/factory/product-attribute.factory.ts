import { v4 as uuid } from 'uuid';
import { Product } from "../entity/product";
import { Attribute } from "../value-objects/attribute";

export class ProductAtributeFactory {
  static create(
    productName: string,
    code: string,
    cost: number,
    price: number,
    promotionalPrice: number | null,
    category: string,

    attributes: Attribute[]
  ) {
    const product = new Product(
      uuid(),
      productName,
      code,
      cost,
      price,
      promotionalPrice,
      category,
      new Date(),
      null,
      null,
      attributes
    )

    return {
      product,
      attributes
    }
  }
}
