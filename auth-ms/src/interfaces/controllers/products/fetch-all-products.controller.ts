import type { Context } from "hono";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";
import { FetchAllProductsUseCase } from "../../../use-case/product/fetch/fetch-all-products.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FetchAllProductsController {
  static async fetchAll(c: Context) {
    try {
      const usecase = new FetchAllProductsUseCase(new ProductRepository())

      const result = await usecase.execute()

      const output = {
        data: result
      }
  
			return c.newResponse(JSON.stringify(output), 200);
		// biome-ignore lint/suspicious/noExplicitAny: <error must be of type any in all cases>
    } catch (e: any) {
			return new Response(JSON.stringify({ message: e.message }), {
				status: 400,
			});
    }
  }
}