import { RecordRepositoryInterface } from "../../../repositories/record/record-repository.interface"
import { RecordMapper } from "../mappers/mapper"

export class FetchAllRecordUseCase {
  private readonly recordRepository: RecordRepositoryInterface

  constructor(
    recordRepository: RecordRepositoryInterface
  ) {
    this.recordRepository = recordRepository
  }

  async execute() {
    const raw = await this.recordRepository.findAll()

    const materials = raw.map((m) => RecordMapper.execute(m))

    return materials
  }
}