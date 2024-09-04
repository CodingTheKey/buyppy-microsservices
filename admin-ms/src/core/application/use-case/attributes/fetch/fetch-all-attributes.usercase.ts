import { AttributesRepositoryInterface } from "../../../repositories/attribute/attributes-repository.interface";
import { AttributesMapper } from "../mappers/mapper";

export class FetchAllAttributesUseCase {
  private readonly attributeRepository: AttributesRepositoryInterface

  constructor(
    attributeRepository: AttributesRepositoryInterface
  ) {
    this.attributeRepository = attributeRepository
  }

  async execute() {
    const raw = await this.attributeRepository.findAll()

    const attributes = raw.map((a) => AttributesMapper.execute(a))

    return attributes
  }
}