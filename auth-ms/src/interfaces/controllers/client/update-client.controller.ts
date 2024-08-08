import type { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository"
import { UpdateClientUseCase } from "../../../use-case/client/update/update-client.usecase"

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UpdateClientController {
  static async execute(c: Context) {
    try {
      const id = c.req.param('id')
      const input = await c.req.json()

      const usecase = new UpdateClientUseCase(new ClientRepository())

      const output = await usecase.execute(id, input)

      return c.newResponse(JSON.stringify({ data: output }), 200)

    // biome-ignore lint/suspicious/noExplicitAny: <exception in catch must ever be any typed>
    } catch (e: any) {
      throw new HTTPException(500, { message: e.message })
    }
  }
}