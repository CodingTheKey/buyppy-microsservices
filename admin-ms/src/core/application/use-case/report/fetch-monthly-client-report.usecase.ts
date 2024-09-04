import { ClientRepositoryInterface } from "../../../application/client/repository/prisma/client-repository.interface"

export class FetchMonthlyClientsReport {
  private clientRepository: ClientRepositoryInterface

  constructor(clientRepository: ClientRepositoryInterface) {
    this.clientRepository = clientRepository
  }

  execute(start: Date, end: Date) {
    
  }
}