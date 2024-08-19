import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";
import { ExportProductsUseCase } from "../../../use-case/product/export/export-client.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ExportProductsController {
  static async execute(c: Context) {
    try {
      const useCase = new ExportProductsUseCase(new ProductRepository());

      const products = await useCase.execute();
      const workbook = await useCase.generateExcel(products);
      const buffer = await workbook.xlsx.writeBuffer();

      return c.newResponse(buffer, 200, {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="products.xlsx"',
      });
    } catch (e: any) {
      console.error("Error exporting products:", e);
      throw new HTTPException(500, { message: "Failed to export products" });
    }
  }
}