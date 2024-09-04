import { ProductMapper } from "../../../domain/product/mapper"
import type { ProductRepositoryInterface } from "../../../infra/product/repository/prisma/product-repository.interface"

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