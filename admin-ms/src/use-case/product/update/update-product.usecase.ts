import { Product } from "../../../domain/product/entity/product"
import type { ProductRepositoryInterface } from "../../../infra/product/repository/prisma/product-repository.interface"
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
      input.category ?? oldProduct.category
    )

    await this.productRepository.update(product)
  }
}