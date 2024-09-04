import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { AttributeRepository } from "../../../application/repositories/attribute/prisma/prisma-attribute.repository";
import { FetchAllAttributesUseCase } from "../../../application/use-case/attributes/fetch/fetch-all-attributes.usercase";

export class FetchAllAttributesController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const useCase = new FetchAllAttributesUseCase(new AttributeRepository());

    const attributes = await useCase.execute();

    return c.newResponse(JSON.stringify({ data: attributes }), 200)
  }
}