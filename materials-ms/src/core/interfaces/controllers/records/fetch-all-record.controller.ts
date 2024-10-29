import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../../decorators/http-exceptions-handler.decorator";
import { RecordRepository } from "../../../application/repositories/record/drizzle/record.repository";
import { FetchAllRecordUseCase } from "../../../application/use-case/record/fetch/fetch-all-record.usercase";

export class FetchAllRecordController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const useCase = new FetchAllRecordUseCase(new RecordRepository());

    const attributes = await useCase.execute();

    return c.newResponse(JSON.stringify({ data: attributes }), 200)
  }
}