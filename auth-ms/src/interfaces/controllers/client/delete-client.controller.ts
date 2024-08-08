import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository";
import { DeleteClientUseCase } from "../../../use-case/client/delete/delete-client.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DeleteClientController {
  static async execute(c: Context) {
    try {
      const id = c.req.param('id');

      const usecase = new DeleteClientUseCase(new ClientRepository())

      await usecase.execute(id)

      return c.newResponse(JSON.stringify({ message: "client deleted with success!" }), 200)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (e: any) {
      throw new HTTPException(500, { message: JSON.stringify(e.message) })
    }
  }
}