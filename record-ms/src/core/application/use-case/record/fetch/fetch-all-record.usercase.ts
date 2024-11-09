import type { RecordRepositoryInterface } from "../../../repositories/record/record-repository.interface"
import { RecordMaterialsMapper } from "../mappers/mapper"

export class FetchAllRecordUseCase {
  private readonly recordRepository: RecordRepositoryInterface

  constructor(
    recordRepository: RecordRepositoryInterface
  ) {
    this.recordRepository = recordRepository
  }

  async execute() {
    const raw = await this.recordRepository.findAll()

    const materials = raw.map((m) => RecordMaterialsMapper.execute(m))

    return materials
  }
}