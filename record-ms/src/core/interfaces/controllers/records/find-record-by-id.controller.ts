import { Context } from "hono";
import { HTTPExceptionHandler } from "../../../../../decorators/http-exceptions-handler.decorator";
import { RecordRepository } from "../../../application/repositories/record/drizzle/record.repository";
import { FindRecordByIdUseCase } from "../../../application/use-case/record/find/find-record-by-id.usecase";

export class FindRecordByIdController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const { id } = c.req.param();

    const usecase = new FindRecordByIdUseCase(new RecordRepository());
    const output = await usecase.execute(id);

    return c.newResponse(JSON.stringify(output), 200);
  }
}