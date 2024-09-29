import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { AttributeRepository } from "../../../application/repositories/attribute/prisma/prisma-attribute.repository";
import { FindAttributeByIdUseCase } from "../../../application/use-case/attributes/find/find-attribute-by-id.usecase";

export class FindAttributeByIdController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const { id } = c.req.param();

    const usecase = new FindAttributeByIdUseCase(new AttributeRepository());
    const output = await usecase.execute(id);

    return c.newResponse(JSON.stringify(output), 200);
  }
}