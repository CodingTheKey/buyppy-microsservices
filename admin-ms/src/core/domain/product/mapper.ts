import type { Product } from "./entity/product";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ProductMapper {
  static execute(entity: Product) {
    return {
      id: entity.id,
      name: entity.name,
      code: entity.code,
      cost: entity.cost,
      category: entity.category,
      price: entity.price,
      promotionalPrice: entity.promotionalPrice,
      
      attribute: entity.attributes.map((a) => ({
        id: a.id,
        key: a.key,
        value: a.value,
        stockQuantity: a.stockQuantity
      })),
    }
  }
}