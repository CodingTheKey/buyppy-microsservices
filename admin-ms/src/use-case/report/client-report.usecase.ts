import { ClientRepositoryInterface } from "../../infra/client/repository/prisma/client-repository.interface"

export class ClientReportUseCase {
  private clientRepository: ClientRepositoryInterface

  constructor(clientRepository: ClientRepositoryInterface) {
    this.clientRepository = clientRepository
  }

  execute(period: 'daily' | 'monthly' | 'annual' = 'daily') {
    let result

    if (period === 'daily') result = this.clientRepository.countAll()
    if (period === 'monthly') throw new Error('option not implemented')
    if (period === 'annual') throw new Error('option not implemented')

    return result
  }
}