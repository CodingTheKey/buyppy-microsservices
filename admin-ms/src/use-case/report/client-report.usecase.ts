import { ClientRepositoryInterface } from "../../infra/client/repository/prisma/client-repository.interface"

export class ClientReportUseCase {
  private clientRepository: ClientRepositoryInterface

  constructor(clientRepository: ClientRepositoryInterface) {
    this.clientRepository = clientRepository
  }

  execute(period: 'daily' | 'monthly' | 'annual' = 'daily') {
    let result

    if (period === 'daily') result = this.clientRepository.countDailyCreated()
    if (period === 'monthly') result = this.clientRepository.countMonthlyCreated()
    if (period === 'annual') throw new Error('option not implemented')

    return result
  }
}
