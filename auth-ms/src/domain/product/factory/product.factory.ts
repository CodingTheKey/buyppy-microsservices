import { v4 as uuid } from "uuid";
import { Product } from "../entity/product";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ProductFactory {
  public static create(
    name: string,
    code: string,
    coast: number,
    price: number,
    promotionalPrice: number | null,
    category: string
  ): Product {
    return new Product(
      uuid(),
      name,
      code,
      coast,
      price,
      promotionalPrice,
      category
    )
  }
}
