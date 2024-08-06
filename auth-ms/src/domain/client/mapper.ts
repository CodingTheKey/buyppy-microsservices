import type User from "./entity/client";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UserMapper {
  static execute(user: User) {
    return {
      id: user.id,
      document: user.document,
      phone: user.phone,
      email: user.email,
      name: user.name,
      observations: user.observations,
      address: {
        street: user.address.street,
        number: user.address.number,
        zipCode: user.address.zipCode,
      }
    }
  }
}
