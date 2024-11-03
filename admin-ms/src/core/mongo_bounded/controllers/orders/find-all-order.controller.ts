import { Context } from "hono";
import { OrderRepository } from "../../repositories/orders/fauna/order-repository";
import { FindAllOrdersUseCase } from "../../usecases/orders/find-all-orders.usecase";

export class FindAllOrdersMongoController {
  static async execute(c: Context) {
    const usecase = new FindAllOrdersUseCase(new OrderRepository())

    const output = await usecase.execute()

    return c.newResponse(JSON.stringify(output))
  }
}