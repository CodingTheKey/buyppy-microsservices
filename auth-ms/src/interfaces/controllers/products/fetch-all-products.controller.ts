import { ProductRepository } from "../../../infra/product/prisma/product.repository";
import { FetchAllProductsUseCase } from "../../../use-case/product/fetch/fetch-all-products.usecase";

export class FetchAllProductsController {
  async execute() {
    const usecase = new FetchAllProductsUseCase(new ProductRepository())

    return await usecase.execute()
  }
}