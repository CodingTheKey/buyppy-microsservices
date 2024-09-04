import type { ProductRepositoryInterface } from "../../../../application/product/repository/prisma/product-repository.interface"
import { ProductMapper } from "../../../../domain/product/mapper"

export class FetchProductByIdUseCase {
  private productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(id: string) {
    const product = await this.productRepository.find(id)

    return ProductMapper.execute(product)
  }
}