import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { ProductRepository } from "../../../application/repositories/product/prisma/product.repository";
import { UpdateProductUseCase } from "../../../application/use-case/product/update/update-product.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UpdateProductController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const id = c.req.param('id')
    const input = await c.req.json()

    const usecase = new UpdateProductUseCase(new ProductRepository())

    const output = await usecase.execute(id, input)

    return c.newResponse(JSON.stringify(output), 200)
  }
}