import { Context } from "hono";
import { OrderRepository } from "../../repositories/orders/fauna/order-repository";
import { CreateOrderUseCase } from "../../usecases/orders/create-order.usecase";

export class CreateOrderNosqlController {
  static async execute(c: Context) {
    const input = await c.req.json()

    const usecase = new CreateOrderUseCase(new OrderRepository())

    const output = await usecase.execute(input)

    return c.newResponse(JSON.stringify(output))
  }
}