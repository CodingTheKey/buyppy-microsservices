import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { CreateOrderUseCase } from "../../../application/use-case/order/create/create-order.usecase";
import { PrismaOrderRepository } from "../../../application/repositories/order/prisma/prisma-order-repository";

export class CreateOrderController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {c
    const input = await c.req.json()

    const usecase = new CreateOrderUseCase(new PrismaOrderRepository())

    const data = await usecase.execute(input)
    const output = {
      data,
      status: 200
    }

    return c.newResponse(JSON.stringify(output))
  }
}