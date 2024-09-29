import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { ClientRepository } from "../../../application/repositories/client/prisma/client.repository";
import { FindClientUseCase } from "../../../application/use-case/client/find/find-client.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FindClientByIdController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const id = c.req.param('id')

    const usecase = new FindClientUseCase(new ClientRepository())

    const output = await usecase.execute(id)

    return c.newResponse(JSON.stringify({ data: output }), 200)
  }
}