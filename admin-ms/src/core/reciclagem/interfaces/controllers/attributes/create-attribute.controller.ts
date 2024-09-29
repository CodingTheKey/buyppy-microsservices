import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { AttributeRepository } from "../../../application/repositories/attribute/prisma/prisma-attribute.repository";
import { CreateAttributeUseCase } from "../../../application/use-case/attributes/create/create-attribute.usecase";

export class CreateAttributeController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const input = await c.req.json()

    const usecase = new CreateAttributeUseCase(new AttributeRepository())

    const output = await usecase.execute(input)

    return c.newResponse(JSON.stringify(output), 201)
  }
}