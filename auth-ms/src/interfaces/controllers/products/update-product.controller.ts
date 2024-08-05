import type { Context } from "hono";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";
import { UpdateProductUseCase } from "../../../use-case/product/update/update-product.usecase";

export class UpdateProductController {
  async execute(c: Context) {
    const id = c.req.param('id');
    const input = await c.req.json()

    const usecase = new UpdateProductUseCase(new ProductRepository())

    return await usecase.execute(id, input)
  }
}