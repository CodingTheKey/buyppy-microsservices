import { ProductMapper } from "../../../../domain/product/mapper"
import { ProductRepositoryInterface } from "../../../repositories/product/product-repository.interface"

export class FetchProductByIdUseCase {
  private productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(id: string) {
    const product = await this.productRepository.find(id)

    const output = ProductMapper.execute(product)

    return output
  }
}