import type { ClientRepositoryInterface } from "../../../infra/client/repository/prisma/client-repository.interface";

export class DeleteClientUseCase {
  private clientRepository: ClientRepositoryInterface

  constructor(clientRepository: ClientRepositoryInterface) {
    this.clientRepository = clientRepository
  }

  async execute(id: string) {
    this.clientRepository.delete(id)
  }
}