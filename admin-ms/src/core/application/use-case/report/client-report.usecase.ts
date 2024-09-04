import dayjs from "dayjs"
import { ClientRepositoryInterface } from "../../../infra/client/repository/prisma/client-repository.interface"

export class ClientReportUseCase {
  private clientRepository: ClientRepositoryInterface

  constructor(clientRepository: ClientRepositoryInterface) {
    this.clientRepository = clientRepository
  }

  async execute(period: 'daily' | 'monthly' | 'annual' = 'daily') {
    let result

    if (period === 'daily') {
      const model = await this.clientRepository.countDailyCreated()
      console.log(dayjs().daysInMonth())
      let formatted = []
      for (let day = 0; day <= dayjs('2019-08-25').daysInMonth() - 1; day++)
        formatted[day] = 0;

      model.forEach((c) => {
        const day = dayjs(c.createdAt).date();
        formatted[day] += 1;
      });

      return formatted
    }
    if (period === 'monthly') {
    }
    if (period === 'annual') throw new Error('option not implemented')

    return result
  }
}
