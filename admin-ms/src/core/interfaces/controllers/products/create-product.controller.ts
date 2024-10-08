import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { ProductRepository } from "../../../application/product/repository/prisma/product.repository";
import { CreateProductUseCase } from "../../../application/use-case/product/create/create-product.usecase";
import type { InputCreateProductDTO } from "../../../application/use-case/product/create/input-create-product.dto";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CreateProductController {
  @HTTPExceptionHandler()
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

    const result = await usecase.execute(registerClientDTO)

    const response = {
      data: result
    }

    return c.newResponse(JSON.stringify(response), 201)
  }
}
