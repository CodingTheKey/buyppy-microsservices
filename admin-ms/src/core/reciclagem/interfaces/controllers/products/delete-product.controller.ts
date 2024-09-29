import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { ProductRepository } from "../../../application/repositories/product/prisma/product.repository";
import { DeleteProductUseCase } from "../../../application/use-case/product/delete/delete-product.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DeleteProductController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const id = c.req.param('id');
    const usecase = new DeleteProductUseCase(new ProductRepository())

    await usecase.execute({ id })

    return c.newResponse(JSON.stringify({ message: "product deleted with success!" }), 200)
  }
}