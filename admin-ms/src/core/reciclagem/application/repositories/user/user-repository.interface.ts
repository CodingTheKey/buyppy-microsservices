import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";
import { User } from "../../../domain/user/entity/User";

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  findByEmail(email: string): Promise<User>
}