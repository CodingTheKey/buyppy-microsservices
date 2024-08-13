import type { ProductRepositoryInterface } from "../../../infra/product/repository/prisma/product-repository.interface";
import type { InputDeleteProductDTO } from "./input-delete-product.dto";

export class DeleteProductUseCase {
  private productRepository: ProductRepositoryInterface
  constructor(
    productRepository: ProductRepositoryInterface
  ) {
    this.productRepository = productRepository
  }
  async execute(input: InputDeleteProductDTO) {
    await this.productRepository.delete(input.id)

    return {}
  }
}