import { AttributeFactory } from "../../../../domain/product/factory/create-attribute.factory"
import { ProductAtributeFactory } from "../../../../domain/product/factory/product-attribute.factory"
import { Category } from "../../../../domain/product/value-objects/category"
import { ProductRepositoryInterface } from "../../../repositories/product/product-repository.interface"
import { InputCreateProductWithAttributesDTO } from "./input.create-product-with-attributes.dto"

export class CreateProductWithAttributesUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputCreateProductWithAttributesDTO) {
    const productWithAttributes = ProductAtributeFactory.create(
      input.name,
      input.code,
      input.cost,
      input.price,
      input.promotionalPrice,
      new Category(input.category.id, input.category.title ?? ''),
      input.attributes.map((a) => AttributeFactory.create(a.id, '', a.value, a.stockQuantity))
    )

    await this.productRepository.createWithAttributes(productWithAttributes.product, productWithAttributes.attributes)
  }
}