import { ProductMapper } from "../../../../domain/product/mapper";
import { ProductRepositoryInterface } from "../../../repositories/product/product-repository.interface";

export class FetchAllProductsUseCase {
  private productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute() {
    const products = await this.productRepository.findAll()

    const output = products.map((p) => ProductMapper.execute(p))

    return output
  }
}
