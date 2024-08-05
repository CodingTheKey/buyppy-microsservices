import type { RepositoryInterface } from "../../../../../domain/@shared/entity/repository/repository-interface";
import type User from "../../../../../domain/user/entity/user";

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  fetchByOrganizationId(organization_id: string): Promise<User[]>
}