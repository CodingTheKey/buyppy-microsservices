import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository";
import { ExportClientsUseCase } from "../../../use-case/client/export/export-client.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ExportClientsController {
  static async execute(c: Context) {
    try {
      const useCase = new ExportClientsUseCase(new ClientRepository());

      const clients = await useCase.execute();
      const workbook = await useCase.generateExcel(clients);
      const buffer = await workbook.xlsx.writeBuffer();

      return c.newResponse(buffer, 200, {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="clients.xlsx"',
      });
    } catch (e: any) {
      console.error("Error exporting clients:", e);
      throw new HTTPException(500, { message: "Failed to export clients" });
    }
  }
}