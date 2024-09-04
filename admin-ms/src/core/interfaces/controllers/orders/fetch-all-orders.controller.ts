import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { FetchAllOrdersUseCase } from "../../../application/use-case/order/fetch/fetch-all-order.usecase";
import { PrismaOrderRepository } from "../../../infra/order/repository/prisma/prisma-order-repository";

export class FetchAllOrderController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const usecase = new FetchAllOrdersUseCase(new PrismaOrderRepository())

    const data = await usecase.execute()
    const output = {
      data,
      message: "found orders successfully",
      status: 200
    }

    return c.newResponse(JSON.stringify(output))
  }
}