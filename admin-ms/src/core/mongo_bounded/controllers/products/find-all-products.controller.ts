import { Context } from "hono";
import { ProductRepository } from "../../repositories/product/fauna/product.repository";
import { FindAllProductsUseCase } from "../../usecases/product/find-all-products.usecase";

export class FindAllProductsMongoController {
  static async execute(c: Context) {
    const usecase = new FindAllProductsUseCase(new ProductRepository())

    const output = await usecase.execute()

    return c.newResponse(JSON.stringify(output))
  }
}