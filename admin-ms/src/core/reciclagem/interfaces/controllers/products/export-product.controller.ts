import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { ProductRepository } from "../../../application/repositories/product/prisma/product.repository";
import { ExportProductsUseCase } from "../../../application/use-case/product/export/export-client.usecase";

export class ExportProductsController {
  @HTTPExceptionHandler("Failed to export products")
  static async execute(c: Context) {
    const useCase = new ExportProductsUseCase(new ProductRepository());

    const products = await useCase.execute();
    const workbook = await useCase.generateExcel(products);
    const buffer = await workbook.xlsx.writeBuffer();

    return c.newResponse(buffer, 200, {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="products.xlsx"',
    });
  }
}