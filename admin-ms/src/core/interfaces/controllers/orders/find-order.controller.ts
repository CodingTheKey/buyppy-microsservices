import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import { FetchOrderById } from "../../../application/use-case/order/fetch/fetch-order-by-id.usecase";
import { PrismaOrderRepository } from "../../../infra/order/repository/prisma/prisma-order-repository";

export class FindOrderController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const id = c.req.param('id')

    const usecase = new FetchOrderById(new PrismaOrderRepository())

    const data = await usecase.execute(id)
    const output = {
      data,
      message: "found order successfully",
      status: 200
    }

    return c.newResponse(JSON.stringify(output))
  }
}