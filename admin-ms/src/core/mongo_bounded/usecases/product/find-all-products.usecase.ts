import { RepositoryInterface } from "../../repositories/product-repository.interface";
import { ProductMapper } from "./mappers/find-all-products.mapper";

export class FindAllProductsUseCase {
  private productRepository: RepositoryInterface

  constructor (productRepository: RepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(): Promise<unknown> {
    const products = await this.productRepository.findAll()

    const output = products.map((p) => ProductMapper.execute(p))

    return output
  }
}