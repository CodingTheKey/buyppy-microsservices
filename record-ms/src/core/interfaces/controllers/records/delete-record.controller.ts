import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { HTTPExceptionHandler } from "../../../../../decorators/http-exceptions-handler.decorator";
import { RecordRepository } from "../../../application/repositories/record/drizzle/record.repository";
import { DeleteRecordUseCase } from "../../../application/use-case/record/delete/delete-record-usecase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DeleteRecordController {
  @HTTPExceptionHandler()
  static async execute(c: Context) {
    const { id } = c.req.param();

    const useCase = new DeleteRecordUseCase(new RecordRepository());

    if (!id) {
      throw new HTTPException(400, { message: 'id is required' })
    }
    const attributes = await useCase.execute({ id });

    return c.newResponse(JSON.stringify({ data: attributes }), 200)
  }
}