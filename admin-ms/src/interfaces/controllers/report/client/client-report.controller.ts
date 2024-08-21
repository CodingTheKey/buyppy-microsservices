import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { ClientRepository } from "../../../../infra/client/repository/prisma/client.repository";
import { ClientReportUseCase } from "../../../../use-case/report/client-report.usecase";

export class ClientRepositoryController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const query = c.req.query('period')
    const usecase = new ClientReportUseCase(new ClientRepository())

    const result = await usecase.execute(query as 'daily' | 'monthly' | 'annual')

    return c.newResponse(JSON.stringify({ data: result }))
  }
}