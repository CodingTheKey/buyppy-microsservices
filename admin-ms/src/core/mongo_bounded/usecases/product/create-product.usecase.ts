import { Entity } from "../../domain/entity/entity/product"
import { ProductRepository } from "../../repositories/product/fauna/product.repository"

export class CreateProductUseCase {
  private readonly productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  execute(input: unknown) {
    const product = new Entity(input)

    return this.productRepository.create(product)
  }
}