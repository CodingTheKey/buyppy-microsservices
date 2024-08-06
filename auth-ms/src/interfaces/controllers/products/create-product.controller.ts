import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";
import { CreateProductUseCase } from "../../../use-case/product/create/create-product.usecase";
import type { InputCreateProductDTO } from "../../../use-case/product/create/input-create-product.dto";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CreateProductController {
  static async execute(c: Context) {
    const input = await c.req.json<InputCreateProductDTO>();

    const registerClientDTO: InputCreateProductDTO = {
      category: input.category,
      cost: input.cost,
      code: input.code,
      name: input.name,
      price: input.price,
      promotionalPrice: input.promotionalPrice
    };

    const usecase = new CreateProductUseCase(new ProductRepository())

    try {
      const result = await usecase.execute(registerClientDTO)

      const response = {
        data: result
      }

      return c.newResponse(JSON.stringify(response), 201)
    // biome-ignore lint/suspicious/noExplicitAny: <all exception must be any typed>
    } catch (e: any) {
      console.log(e.message)
      throw new HTTPException(500, { message: JSON.stringify({
        message: 'Error when trying to create new product!',
        error: e.message
      }) })
    }
  }
}
