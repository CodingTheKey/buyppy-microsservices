import { HTTPException } from "hono/http-exception";
import { Attribute } from "../../../../domain/product/value-objects/attribute";
import { prisma } from "../../../../infra/db/prisma/primsa";
import { AttributesRepositoryInterface } from "../attributes-repository.interface";

export class AttributeRepository implements AttributesRepositoryInterface {
  async create(entity: Attribute): Promise<void | Attribute> {
    await prisma.attribute.create({
      data: {
        id: entity.id,
        key: entity.key.trim().toLowerCase(),
      }
    })
  }
  async findAll(): Promise<Attribute[]> {
    const model = await prisma.attribute.findMany()
    
    const attributes = model.map((a) => new Attribute(a.id, a.key, '', 0))

    return attributes
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(entity: Attribute): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Attribute> {
    const model = await prisma.attribute.findUnique({
      where: {
        id
      }
    })

    if (model === null) throw new HTTPException(400, { message: 'Attribute not found' })

    const attribute = new Attribute(model.id, model.key, '', 0)
    return attribute
  }
}
