import type { MaterialsRepositoryInterface } from "../../../repositories/material/materials-repository.interface"
import { MaterialMapper } from "../mappers/mapper"

export class FetchAllMaterialsUseCase {
  private readonly materialRepository: MaterialsRepositoryInterface

  constructor(
    materialRepository: MaterialsRepositoryInterface
  ) {
    this.materialRepository = materialRepository
  }

  async execute() {
    const raw = await this.materialRepository.findAll()

    const materials = raw.map((m) => MaterialMapper.execute(m))

    return materials
  }
}