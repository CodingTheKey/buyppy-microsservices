import { MaterialFactory } from "../../../domain/material/factories/create-material.factory"
import { MaterialsRepositoryInterface } from "../../../repositories/material/materials-repository.interface"
import { MaterialMapper } from "../mappers/mapper"
import { InputCreateMaterialDto } from "./input-create-material.dto"

export class CreateMaterialUseCase {
  private readonly materialRepository: MaterialsRepositoryInterface
  constructor(
    materialRepository: MaterialsRepositoryInterface
  ) {
    this.materialRepository = materialRepository
  }
  async execute(input: InputCreateMaterialDto) {
    const material = MaterialFactory.create(
      input.name,
      input.price,
    )
    await this.materialRepository.create(material)

    const output = MaterialMapper.execute(material)

    return output
  }
}