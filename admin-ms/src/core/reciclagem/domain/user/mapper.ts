import type { User } from "./entity/User";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UserMapper {
  static execute(entity: User) {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name
    }
  }
}
