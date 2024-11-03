import { Context } from "hono";
import { ProductRepository } from "../../repositories/product/fauna/product.repository";
import { CreateOrderUseCase } from "../../usecases/orders/create-order.usecase";

export class CreateProductsNosqlController {
  static async execute(c: Context) {
    const input = await c.req.json()

    const usecase = new CreateOrderUseCase(new ProductRepository())

    const output = await usecase.execute(input)

    return c.newResponse(JSON.stringify(output))
  }
}