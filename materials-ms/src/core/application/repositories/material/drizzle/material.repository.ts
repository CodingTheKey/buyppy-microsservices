import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { db } from "../../../../infra/db/drizzle/drizzle";
import { materialTable } from "../../../../infra/db/drizzle/material/schema";
import { Material } from "../../../domain/material/entity/material";
import type { MaterialsRepositoryInterface } from "../materials-repository.interface";

export class MaterialRepository implements MaterialsRepositoryInterface {
  async create(entity: Material): Promise<void> {
    await db?.insert(materialTable).values({ id: entity.id, name: entity.name, price: entity.price }).execute()
  }
  update(entity: Material): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Material> {
    const result = await db?.select().from(materialTable).where(eq(materialTable.id, id)).execute()

    if (!result || result?.length === 0) {
      throw new HTTPException(404, { message: 'Material not found' })
    }

    const material = new Material(result?.[0].id, result?.[0].name, result?.[0].price)

    return material
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Material[]> {
    const result = await db?.select().from(materialTable).execute()

    if (!result) {
      return []
    }

    const materials = result?.map((m) => {
      return new Material(m.id, m.name, m.price)
    })

    return materials
  }
}