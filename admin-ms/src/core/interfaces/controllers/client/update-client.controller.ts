import type { Context } from "hono"
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator"
import { UpdateClientUseCase } from "../../../application/use-case/client/update/update-client.usecase"
import { ClientRepository } from "../../../application/repositories/client/repository/prisma/client.repository"

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UpdateClientController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
      const id = c.req.param('id')
      const input = await c.req.json()

      const usecase = new UpdateClientUseCase(new ClientRepository())

      const output = await usecase.execute(id, input)

      return c.newResponse(JSON.stringify({ data: output }), 200)
  }
}