import type User from "./entity/user";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UserMapper {
  static execute(user: User) {
    return {
      id: user.id,
      document: user.document,
      phone: user.phone,
      email: user.email,
      name: user.name,
      password: user.password,
      address: {
        street: user.address.street,
        number: user.address.number,
        zipCode: user.address.zipCode,
      }
    }
  }
}
