import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { CategoryRepository } from "../../../application/repositories/category/prisma/prisma-category.repository";
import { CreateCategoryUseCase } from "../../../application/use-case/category/create/create-category.usecase";

export class CreateCategoryController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const input = await c.req.json()

    const usecase = new CreateCategoryUseCase(new CategoryRepository())

    const output = await usecase.execute(input)

    return c.newResponse(JSON.stringify(output), 201)
  }
}