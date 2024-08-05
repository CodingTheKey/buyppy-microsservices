import { ProductFactory } from "../../../domain/product/factory/product.factory";
import type { ProductRepositoryInterface } from "../../../infra/product/prisma/product-repository.interface";
import type { InputCreateProductDTO } from "./input-create-product.dto";

export class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputCreateProductDTO) {
    const product = ProductFactory.create(
      input.name,
      input.code,
      input.coast,
      input.price,
      input.promotionalPrice,
      input.category
    )
  }
}