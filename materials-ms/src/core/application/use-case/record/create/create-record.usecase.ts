import { RecordFactory } from "../../../domain/record/factories/create-record.factory";
import { RecordRepositoryInterface } from "../../../repositories/record/record-repository.interface";
import { RecordMapper } from "../mappers/mapper";
import { InputCreateRecordDto } from "./input-create-record.dto";

export class CreateRecordUseCase {
  private readonly recordRepository: RecordRepositoryInterface
  constructor(
    recordRepository: RecordRepositoryInterface
  ) {
    this.recordRepository = recordRepository
  }
  async execute(input: InputCreateRecordDto) {
    const record = RecordFactory.create(
      input.name,
      input.weight,
    )
    await this.recordRepository.create(record)

    const output = RecordMapper.execute(record)

    return output
  }
}