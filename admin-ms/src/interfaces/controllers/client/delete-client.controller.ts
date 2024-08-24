import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../decorators/http-exceptions-handler.decorator";
import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository";
import { DeleteClientUseCase } from "../../../use-case/client/delete/delete-client.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DeleteClientController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const id = c.req.param('id');

    const usecase = new DeleteClientUseCase(new ClientRepository())

    await usecase.execute(id)

    return c.newResponse(JSON.stringify({ message: "client deleted with success!" }), 200)
  }
}