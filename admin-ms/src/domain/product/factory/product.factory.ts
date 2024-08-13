import { v4 as uuid } from "uuid";
import { Product } from "../entity/product";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ProductFactory {
  public static create(
    name: string,
    code: string,
    cost: number,
    price: number,
    promotionalPrice: number | null,
    category: string,

    createdAt: Date | null = null,
    updatedAt: Date | null = null,
    deletedAt: Date | null = null
  ): Product {
    return new Product(
      uuid(),
      name,
      code,
      cost,
      price,
      promotionalPrice,
      category,

      createdAt,
      updatedAt,
      deletedAt
    )
  }
}