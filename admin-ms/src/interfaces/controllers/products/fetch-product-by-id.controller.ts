import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";
import { FetchProductByIdUseCase } from "../../../use-case/product/fetch/fetch-product-by-id.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FetchProductByIdController {
  static async execute(c: Context) {
    try {
      const id = c.req.param('id')

      const usecase = new FetchProductByIdUseCase(new ProductRepository())

      const output = await usecase.execute(id)

      return c.newResponse(JSON.stringify({ data: output }), 200)

    // biome-ignore lint/suspicious/noExplicitAny: <exception in catch must ever be any typed>
    } catch (e: any) {
      throw new HTTPException(500, { message: e.message })
    }
  }
}