import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../../decorators/http-exceptions-handler.decorator";
import { ClientReportUseCase } from "../../../../application/use-case/report/client-report.usecase";
import { ClientRepository } from "../../../../infra/client/repository/prisma/client.repository";

export class ClientRepositoryController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const query = c.req.query('period')
    const usecase = new ClientReportUseCase(new ClientRepository())

    const result = await usecase.execute(query as 'daily' | 'monthly' | 'annual')

    return c.newResponse(JSON.stringify({ data: result }))
  }
}