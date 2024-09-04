import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { DeleteClientUseCase } from "../../../application/use-case/client/delete/delete-client.usecase";
import { ClientRepository } from "../../../application/repositories/client/repository/prisma/client.repository";

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