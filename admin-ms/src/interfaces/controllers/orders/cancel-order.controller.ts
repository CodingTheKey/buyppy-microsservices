import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../decorators/http-exceptions-handler.decorator";

export class CancelOrderController {
  @HTTPExceptionHandler()
  execute(c: Context) {
    const input = c.req.json()

    // const usecase = 
  }
}