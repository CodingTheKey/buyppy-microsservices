import type { Product } from "./entity/product";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ProductMapper {
  static execute(entity: Product) {
    return {
      id: entity.id,
      name: entity.name,
      code: entity.code,
      cost: entity.cost,

      price: entity.price,
      promotionalPrice: entity.promotionalPrice,

      quantity: entity.quantity,

      category: {
        id: entity.category.id,
        title: entity.category.title
      },
      attribute: entity.attributes.map((a) => ({
        id: a.id,
        attributeId: a.productAttributeId,
        key: a.key,
        value: a.value,
        stockQuantity: a.stockQuantity,
        stockId: a.stockId
      })),

      createdAt: entity.createdAt
    }
  }
}