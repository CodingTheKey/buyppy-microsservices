import type { MaterialsRepositoryInterface } from "../../../repositories/material/materials-repository.interface";
import { MaterialMapper } from "../mappers/mapper";

export class FindMaterialByIdUseCase {
  private readonly materialRepository: MaterialsRepositoryInterface
  constructor(
    materialRepository: MaterialsRepositoryInterface
  ) {
    this.materialRepository = materialRepository
  }

  async execute(id: string) {
    const attribute = await this.materialRepository.find(id)

    return MaterialMapper.execute(attribute)
  }
}