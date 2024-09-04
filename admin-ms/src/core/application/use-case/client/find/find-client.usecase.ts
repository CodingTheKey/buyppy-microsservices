import type { ClientRepositoryInterface } from "../../../../application/client/repository/prisma/client-repository.interface"
import { UserMapper } from "../../../../domain/client/mapper"

export class FindClientUseCase {
  private clientRepository: ClientRepositoryInterface

  constructor(clientRepository: ClientRepositoryInterface) {
    this.clientRepository = clientRepository
  }

  async execute(id: string) {
    const client = await this.clientRepository.find(id)

    return UserMapper.execute(client)
  }
}
