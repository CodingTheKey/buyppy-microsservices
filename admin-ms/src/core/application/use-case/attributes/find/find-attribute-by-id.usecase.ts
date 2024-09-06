import { AttributeRepository } from "../../../repositories/attribute/prisma/prisma-attribute.repository";
import { AttributesMapper } from "../mappers/mapper";

export class FindAttributeByIdUseCase {
  private readonly attributeRepository: AttributeRepository
  constructor(
    attributeRepository: AttributeRepository
  ) {
    this.attributeRepository = attributeRepository
  }

  async execute(id: string) {
    const attribute = await this.attributeRepository.find(id)

    return AttributesMapper.execute(attribute)
  }
}