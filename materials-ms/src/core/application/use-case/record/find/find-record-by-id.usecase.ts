import { RecordRepositoryInterface } from "../../../repositories/record/record-repository.interface";
import { RecordMapper } from "../mappers/mapper";

export class FindRecordByIdUseCase {
  private readonly recordRepository: RecordRepositoryInterface
  constructor(
    recordRepository: RecordRepositoryInterface
  ) {
    this.recordRepository = recordRepository
  }

  async execute(id: string) {
    const record = await this.recordRepository.find(id)

    return RecordMapper.execute(record)
  }
}