import { RecordFactory } from "../../../domain/record/factories/create-record.factory";
import type { RecordRepositoryInterface } from "../../../repositories/record/record-repository.interface";
import { RecordMapper } from "../mappers/mapper";
import type { InputCreateRecordDto } from "./input-create-record.dto";

export class CreateRecordUseCase {
  private readonly recordRepository: RecordRepositoryInterface
  constructor(
    recordRepository: RecordRepositoryInterface
  ) {
    this.recordRepository = recordRepository
  }
  async execute(input: InputCreateRecordDto) {
    const record = RecordFactory.create(
      input.weight,
      input.materialsIds,
    )

    await this.recordRepository.create(record)

    const output = RecordMapper.execute(record)

    return output
  }
}