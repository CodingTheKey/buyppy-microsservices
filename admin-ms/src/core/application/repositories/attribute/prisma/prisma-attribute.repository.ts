import { Attribute } from "../../../../domain/product/value-objects/attribute";
import { prisma } from "../../../../infra/db/prisma/primsa";
import { AttributesRepositoryInterface } from "../attributes-repository.interface";

export class AttributeRepository implements AttributesRepositoryInterface {
  create(entity: Attribute): Promise<void | Attribute> {
    throw new Error("Method not implemented.");
  }
  update(entity: Attribute): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Attribute> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Attribute[]> {
    const model = await prisma.attribute.findMany()
    
    const attributes = model.map((a) => new Attribute(a.id, a.key, '', 0))

    return attributes
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
