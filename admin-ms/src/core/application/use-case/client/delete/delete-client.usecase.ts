import type { ClientRepositoryInterface } from "../../../../application/client/repository/prisma/client-repository.interface";

export class DeleteClientUseCase {
  private clientRepository: ClientRepositoryInterface

  constructor(clientRepository: ClientRepositoryInterface) {
    this.clientRepository = clientRepository
  }

  async execute(id: string) {
    await this.clientRepository.delete(id)
  }
}