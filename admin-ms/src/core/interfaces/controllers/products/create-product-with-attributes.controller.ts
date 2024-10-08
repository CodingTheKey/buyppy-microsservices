import { Context } from "hono"
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator"
import { ProductRepository } from "../../../application/repositories/product/prisma/product.repository"
import { CreateProductWithAttributesUseCase } from "../../../application/use-case/product/create/create-product-with-attributes.usecase"
import { InputCreateProductWithAttributesDTO } from "../../../application/use-case/product/create/input.create-product-with-attributes.dto"

export class CreateProductWithAttributesController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const input = await c.req.json<InputCreateProductWithAttributesDTO>()

    const usecase = new CreateProductWithAttributesUseCase(new ProductRepository())

    const output = await usecase.execute(input)

    return c.newResponse(JSON.stringify(output), 201)
  }
}