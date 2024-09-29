import { ProductRepository } from "../../repositories/product/fauna/product.repository";
import { ProductMapper } from "./mappers/find-all-products.mapper";

export class FindAllProductsUseCase {
  private productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async execute(): Promise<unknown> {
    const products = await this.productRepository.findAll()

    const output = products.map((p) => ProductMapper.execute(p))

    return output
  }
}