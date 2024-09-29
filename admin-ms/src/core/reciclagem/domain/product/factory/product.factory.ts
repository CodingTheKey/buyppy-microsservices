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
    categoryId: string,

    createdAt: Date | null = null,
    updatedAt: Date | null = null,
    deletedAt: Date | null = null,
  ): Product {
    const product =  new Product(
      uuid(),
      name,
      code,
      cost,
      price,
      promotionalPrice,
      categoryId,
    )
    product.setCreatedAt(createdAt ?? new Date())

    return product
  }
}
