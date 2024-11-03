import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { db } from "../../../../infra/db/drizzle/drizzle";
import { materialTable } from "../../../../infra/db/drizzle/material/schema";
import { recordTable } from "../../../../infra/db/drizzle/record/schema";
import { Record } from "../../../domain/record/entity/record";
import type { RecordRepositoryInterface } from "../record-repository.interface";

export class RecordRepository implements RecordRepositoryInterface {
  async create(entity: Record): Promise<void> {
    console.log(entity)
    const material = await db?.select().from(materialTable).where(eq(materialTable.id, entity.materialId)).execute()

    console.log(material)

    if (!material || material?.length === 0)
      throw new HTTPException(404, { message: 'Material not found' })

    await db?.insert(recordTable).values({ id: entity.id, weight: entity.weight, materialId: entity.materialId }).execute()
  }
  update(entity: Record): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Record> {
    const result = await db?.select().from(recordTable).where(eq(recordTable.id, id)).execute()

    if (!result || result?.length === 0)
      throw new HTTPException(404, { message: 'Record not found' })

    const record = new Record(result?.[0].id, result?.[0].weight, result?.[0].materialId)

    return record
  }
  delete(id: string): Promise<void> {
    throw new Error("Record not implemented.");
  }
  async findAll(): Promise<Record[]> {
    const result = await db?.select().from(recordTable).execute()

    if (!result || result?.length === 0)
      return []

    const records = result?.map((r) => {
      return new Record(r.id, r.weight, r.materialId)
    })

    return records
  }
}