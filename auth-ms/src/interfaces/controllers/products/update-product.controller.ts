import type { Context } from "hono";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";
import { UpdateProductUseCase } from "../../../use-case/product/update/update-product.usecase";
import { HTTPException } from "hono/http-exception";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UpdateProductController {
  static async execute(c: Context) {
    try {
      const id = c.req.param('id');
      const input = await c.req.json()
  
      const usecase = new UpdateProductUseCase(new ProductRepository())
  
      const output = await usecase.execute(id, input)

      return c.newResponse(JSON.stringify(output), 200)
    } catch (e: any) {
      throw new HTTPException(500, {
        message: e.message
      })
    }
  }
}