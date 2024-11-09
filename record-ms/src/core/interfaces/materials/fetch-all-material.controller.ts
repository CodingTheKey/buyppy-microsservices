import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { MaterialRepository } from "../../application/repositories/material/drizzle/material.repository";
import { FetchAllMaterialsUseCase } from "../../application/use-case/material/fetch/fetch-all-materials.usercase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FetchAllMaterialsController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const useCase = new FetchAllMaterialsUseCase(new MaterialRepository());

    const attributes = await useCase.execute();

    return c.newResponse(JSON.stringify({ data: attributes }), 200)
  }
}