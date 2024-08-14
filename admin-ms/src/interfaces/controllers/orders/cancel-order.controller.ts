import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../decorators/http-exceptions-handler.decorator";
import { PrismaOrderRepository } from "../../../infra/order/repository/prisma/prisma-order-repository";
import { CancelOrderUseCase } from "../../../use-case/order/cancel/cancel-order.usecase";

export class CancelOrderController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const input = await c.req.json()
    const id = c.req.param("id")

    const usecase = new CancelOrderUseCase(new PrismaOrderRepository())

    const result = await usecase.execute(id, input)

    const output = {
      data: result,
      message: 'order canceled successfully',
      status: 202
    }

    return c.newResponse(JSON.stringify(output))
  }
}