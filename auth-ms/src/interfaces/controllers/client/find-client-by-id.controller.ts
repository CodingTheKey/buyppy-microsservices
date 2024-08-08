import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository";
import { FindClientUseCase } from "../../../use-case/client/find/find-client.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FindClientByIdController {
  static async execute(c: Context) {
    try {
      const id = c.req.param('id')

      const usecase = new FindClientUseCase(new ClientRepository())

      const output = await usecase.execute(id)

      return c.newResponse(JSON.stringify({ data: output }), 200)

    // biome-ignore lint/suspicious/noExplicitAny: <exception in catch must ever be any typed>
    } catch (e: any) {
      throw new HTTPException(500, { message: e.message })
    }
  }
}