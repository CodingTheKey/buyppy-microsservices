import type { RepositoryInterface } from "../../../../domain/@shared/entity/repository/repository-interface"
import type Client from "../../../../domain/client/entity/client"


export interface ClientRepositoryInterface extends RepositoryInterface<Client> {
  fetchByOrganizationId(organization_id: string): Promise<Client[]>
  findByEmail(email: string): Promise<Client>

  countAll(): Promise<number>

  countDailyCreated(start: Date, end: Date): Promise<number>
  countMonthlyCreated(start: Date, end: Date): Promise<number>
  countAnnualCreated(start: Date, end: Date): Promise<number>
}