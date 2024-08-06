import type { RepositoryInterface } from "../../../../../domain/@shared/entity/repository/repository-interface";
import type User from "../../../../../domain/client/entity/client";

export interface ClientRepositoryInterface extends RepositoryInterface<User> {
  fetchByOrganizationId(organization_id: string): Promise<User[]>
  findByEmail(email: string): Promise<User>
}