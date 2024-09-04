import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { FetchProductByIdUseCase } from "../../../application/use-case/product/fetch/fetch-product-by-id.usecase";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FetchProductByIdController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const id = c.req.param('id')

    const usecase = new FetchProductByIdUseCase(new ProductRepository())

    const output = await usecase.execute(id)

    return c.newResponse(JSON.stringify({ data: output }), 200)
  }
}