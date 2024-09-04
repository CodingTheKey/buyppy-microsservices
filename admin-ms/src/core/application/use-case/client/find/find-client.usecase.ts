import { UserMapper } from "../../../../domain/client/mapper"
import type { ClientRepositoryInterface } from "../../../../infra/client/repository/prisma/client-repository.interface"

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
