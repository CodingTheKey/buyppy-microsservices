import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface"
import Client from "../../../domain/client/entity/client"

export interface ClientRepositoryInterface extends RepositoryInterface<Client> {
  fetchByOrganizationId(organization_id: string): Promise<Client[]>
  findByEmail(email: string): Promise<Client>

  countAll(): Promise<number>

  countDailyCreated(start?: Date, end?: Date): Promise<Client[]>
  countMonthlyCreated(start?: Date, end?: Date): Promise<Record<string, any>[]>
  countAnnualCreated(start?: Date, end?: Date): Promise<Record<string, any>[]>
}