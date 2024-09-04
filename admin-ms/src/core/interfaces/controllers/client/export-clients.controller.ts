import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { ExportClientsUseCase } from "../../../application/use-case/client/export/export-client.usecase";
import { ClientRepository } from "../../../application/repositories/client/repository/prisma/client.repository";

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