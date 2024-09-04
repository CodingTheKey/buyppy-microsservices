import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { FetchAllProductsUseCase } from "../../../application/use-case/product/fetch/fetch-all-products.usecase";
import { ProductRepository } from "../../../application/repositories/product/repository/prisma/product.repository";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FetchAllProductsController {
  @HTTPExceptionHandler()
  static async fetchAll(c: Context) {
    const usecase = new FetchAllProductsUseCase(new ProductRepository())

    const result = await usecase.execute()

    const output = {
      data: result
    }

    return c.newResponse(JSON.stringify(output), 200);
  }
}