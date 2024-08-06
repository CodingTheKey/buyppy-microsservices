import { User } from "../../../domain/user/entity/User";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UserMapper {
  static execute(entity: User) {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt
    }
  }
}