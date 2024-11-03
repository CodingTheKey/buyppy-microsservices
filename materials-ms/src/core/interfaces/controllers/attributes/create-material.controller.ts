import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../../decorators/http-exceptions-handler.decorator";
import { MaterialRepository } from "../../../application/repositories/material/drizzle/material.repository";
import { CreateMaterialUseCase } from "../../../application/use-case/material/create/create-material.usecase";

export class CreateMaterialController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const input = await c.req.json()

    const usecase = new CreateMaterialUseCase(new MaterialRepository())

    const output = await usecase.execute(input)

    return c.newResponse(JSON.stringify(output), 201)
  }
}