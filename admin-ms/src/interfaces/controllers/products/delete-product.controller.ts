import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";
import { DeleteProductUseCase } from "../../../use-case/product/delete/delete-product.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DeleteProductController {
  static async execute(c: Context) {
    try {
      const id = c.req.param('id');
      const usecase = new DeleteProductUseCase(new ProductRepository())

      await usecase.execute({ id })

      return c.newResponse(JSON.stringify({ message: "product deleted with success!" }), 200)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (e: any) {
      throw new HTTPException(500, { message: JSON.stringify(e.message) })
    }
  }
}