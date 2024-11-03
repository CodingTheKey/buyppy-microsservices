import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { ProductRepository } from "../../../application/repositories/product/prisma/product.repository";
import { FetchAllProductsUseCase } from "../../../application/use-case/product/fetch/fetch-all-products.usecase";

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