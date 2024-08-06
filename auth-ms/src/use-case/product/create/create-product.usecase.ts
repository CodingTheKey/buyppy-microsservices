import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductMapper } from "../../../domain/product/mapper";
import type { ProductRepositoryInterface } from "../../../infra/product/repository/prisma/product-repository.interface";
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
      input.cost,
      input.price,
      input.promotionalPrice,
      input.category,
    )

    await this.productRepository.create(product)

    const raw = ProductMapper.execute(product)

    return raw
  }
}