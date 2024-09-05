import { v4 as uuid } from "uuid";
import { AttributeFactory } from "../../../../domain/product/factory/create-attribute.factory";
import { AttributesRepositoryInterface } from "../../../repositories/attribute/attributes-repository.interface";
import { AttributesMapper } from "../mappers/mapper";
import { InputCreateAttributeDto } from "./input-create-attribute.dto";

export class CreateAttributeUseCase {
  private readonly attributeRepository: AttributesRepositoryInterface
  constructor(
    attributeRepository: AttributesRepositoryInterface
  ) {
    this.attributeRepository = attributeRepository
  }
  async execute(input: InputCreateAttributeDto) {
    const attribute = AttributeFactory.create(
      uuid(),
      input.title,
      '',
      0
    )
    await this.attributeRepository.create(attribute)

    const output = AttributesMapper.execute(attribute)

    return output
  }
}