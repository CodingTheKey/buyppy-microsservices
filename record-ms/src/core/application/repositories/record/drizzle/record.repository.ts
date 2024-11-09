import { eq, inArray } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { v4 as uuid } from "uuid";
import { db } from "../../../../infra/db/drizzle/drizzle";
import { materialTable } from "../../../../infra/db/drizzle/material/schema";
import { materialsRecordsTable } from "../../../../infra/db/drizzle/material_record/schema";
import { recordTable } from "../../../../infra/db/drizzle/record/schema";
import { Material } from "../../../domain/material/entity/material";
import { Record } from "../../../domain/record/entity/record";
import { RecordMaterials } from "../../../domain/record/entity/record-materials";
import type { RecordRepositoryInterface } from "../record-repository.interface";

export class RecordRepository implements RecordRepositoryInterface {
  async create(entity: Record): Promise<void> {
    const materials = await db?.select().from(materialTable).where(inArray(materialTable.id, entity.materialsIds)).execute()


    if (!materials || materials?.length === 0)
      throw new HTTPException(404, { message: 'Material not found' })

    await db?.insert(recordTable).values({ id: entity.id, weight: entity.weight }).execute()

    for (const material of materials) {
      console.log({ 
        id: uuid(),
        recordId: entity.id,
        materialPrice: material.price,
        recordWeight: entity.weight,
        created_at: new Date(),
        updated_at: new Date(),
      })
      await db?.insert(materialsRecordsTable).values({ 
        id: uuid(),
        recordId: entity.id,
        materialId: material.id,
        materialPrice: material.price,
        recordWeight: entity.weight,
        created_at: new Date(),
        updated_at: new Date(),
      }).execute()
    }
  }
  update(entity: Record): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<RecordMaterials> {
    const result = await db?.select().from(materialsRecordsTable).where(eq(materialsRecordsTable.id, id)).execute()

    if (!result || result?.length === 0)
      throw new HTTPException(404, { message: 'Record not found' })

    const record = new RecordMaterials(result?.[0].id, result?.[0].recordWeight, [new Material(result?.[0].materialId, result?.[0].materialPrice, result?.[0].recordWeight)], id)

    return record
  }
  async delete(id: string): Promise<void> {
    const exist = await db?.select().from(materialsRecordsTable).where(eq(materialsRecordsTable.id, id)).execute()

    if (!exist || exist?.length === 0)
      throw new HTTPException(404, { message: 'Record not found' })

    await db?.delete(materialsRecordsTable).where(eq(materialsRecordsTable.id, id)).execute()
  }
  async findAll(): Promise<RecordMaterials[]> {
    const result = await db?.select().from(recordTable).execute()

    if (!result || result?.length === 0)
      return []

    const recordMaterials: RecordMaterials[] = []

    for (const record of result) {
      const recordsMaterials = await db?.select().from(materialsRecordsTable).where(eq(materialsRecordsTable.recordId, record.id)).execute()

      if (!recordsMaterials || recordsMaterials?.length === 0)
        continue

      for (const recordMaterial of recordsMaterials) {
        const material = new Material(recordMaterial.materialId, recordMaterial.materialPrice, recordMaterial.recordWeight)
        recordMaterials.push(new RecordMaterials(recordMaterial.id, recordMaterial.recordWeight, [material], record.id))
      }
    }

    const mergedRecords: { [key: string]: RecordMaterials } = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    recordMaterials.forEach(record => {
      const recordId = record.recordId;

      if (!mergedRecords[recordId]) {
        mergedRecords[recordId] = {
          id: record.id,
          recordId: record.recordId,
          weight: record.weight,
          materials: [...record._materials]
        };
      } else {
        // biome-ignore lint/style/useNumberNamespace: <explanation>
        mergedRecords[recordId].weight += parseFloat(record.weight);
        mergedRecords[recordId].materials.push(...record.materials);
      }
    });

    const recordsMaterials = Object.values(mergedRecords).map((r: RecordMaterials) => {
      return new RecordMaterials(r.id, r.weight, r.materials, r.recordId)
    })

    return recordsMaterials
  }
}
