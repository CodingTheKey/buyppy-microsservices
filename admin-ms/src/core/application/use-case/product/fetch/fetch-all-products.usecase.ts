import { Product } from "../../../../domain/product/entity/product";
import { ProductMapper } from "../../../../domain/product/mapper";
import { ProductRepositoryInterface } from "../../../repositories/product/product-repository.interface";

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
      p.category,
      p.attributes
    ))

    const raw = products.map((p) => ProductMapper.execute(p))

    return raw
  }
}
