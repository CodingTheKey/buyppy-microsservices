import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../decorators/http-exceptions-handler.decorator";
import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository";
import { ExportClientsUseCase } from "../../../use-case/client/export/export-client.usecase";

export class ExportClientsController {
  @HTTPExceptionHandler("Failed to export clients")
  static async execute(c: Context) {
    const useCase = new ExportClientsUseCase(new ClientRepository());

    const clients = await useCase.execute();
    const workbook = await useCase.generateExcel(clients);
    const buffer = await workbook.xlsx.writeBuffer();

    return c.newResponse(buffer, 200, {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="clients.xlsx"',
    });
  }
}