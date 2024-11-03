import type { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../../decorators/http-exceptions-handler.decorator";
import { RecordRepository } from "../../../application/repositories/record/drizzle/record.repository";
import { CreateRecordUseCase } from "../../../application/use-case/record/create/create-record.usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CreateRecordController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const input = await c.req.json()

    const usecase = new CreateRecordUseCase(new RecordRepository())

    const output = await usecase.execute(input)

    return c.newResponse(JSON.stringify(output), 201)
  }
}