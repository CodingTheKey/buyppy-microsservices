import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { CategoryRepository } from "../../../application/repositories/category/prisma/prisma-category.repository";
import { FindCategoryByIdUseCase } from "../../../application/use-case/category/find/find-category-by-id.usecase";

export class FindCategoryByIdController {

  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const id = c.req.param('id');
    const usecase = new FindCategoryByIdUseCase(new CategoryRepository())

    const output = await usecase.execute(id)

    return c.newResponse(JSON.stringify(output), 200)
  }
}