import { Product } from "../../../domain/product/entity/product";
import type { ProductRepositoryInterface } from "../../../infra/product/repository/prisma/product-repository.interface";

export class FetchAllProductsUseCase {
  private productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute() {
    const productModels = await this.productRepository.findAll()

    const products = productModels.map((p) => new Product(
      p.id,
      p.name,
      p.code,
      p.cost,
      p.price,
      p.promotionalPrice,
      p.category
    ))

    return products
  }
}
