import type { RecordRepositoryInterface } from "../../../repositories/record/record-repository.interface";

export class DeleteRecordUseCase {
  private readonly recordRepository: RecordRepositoryInterface
  constructor(
    recordRepository: RecordRepositoryInterface
  ) {
    this.recordRepository = recordRepository
  }

  async execute(params: { id: string }) {
    await this.recordRepository.delete(params.id)
  }
}