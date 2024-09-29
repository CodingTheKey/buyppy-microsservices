import { Product } from "../../../../domain/product/entity/product"
import { Attribute } from "../../../../domain/product/value-objects/attribute"
import { Category } from "../../../../domain/product/value-objects/category"
import { ProductRepositoryInterface } from "../../../repositories/product/product-repository.interface"
import type { InputUpdateProductDTO } from "./input-update-product.dto"

export class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(id: string, input: InputUpdateProductDTO) {
    const oldProduct = await this.productRepository.find(id)
    const product = new Product(
      id,
      input.name ?? oldProduct.name,
      input.code ?? oldProduct.code,
      input.cost ?? oldProduct.cost,
      input.price ?? oldProduct.price,
      input.promotionalPrice ?? oldProduct.promotionalPrice,
      new Category(input.category.id ?? oldProduct.category.id, ''),
      input.attributes.map((a) => new Attribute(a.id, a.key, a.value, a.stockQuantity, a.attributeId, a.stockId))
    )

    await this.productRepository.update(product)
  }
}
