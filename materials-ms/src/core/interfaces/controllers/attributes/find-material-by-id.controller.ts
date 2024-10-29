import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../../decorators/http-exceptions-handler.decorator";
import { MaterialRepository } from "../../../application/repositories/material/drizzle/material.repository";
import { FindMaterialByIdUseCase } from "../../../application/use-case/material/find/find-material-by-id.usecase";

export class FindMaterialByIdController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const { id } = c.req.param();

    const usecase = new FindMaterialByIdUseCase(new MaterialRepository());
    const output = await usecase.execute(id);

    return c.newResponse(JSON.stringify(output), 200);
  }
}