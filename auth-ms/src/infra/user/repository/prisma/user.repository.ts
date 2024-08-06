import { User } from "../../../../domain/user/entity/User";
import { prisma } from "../../../db/prisma/primsa";
import { UserRepositoryInterface } from "./user-repository.interface";

export class UserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<User> {
    const model = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!model) throw new Error("User not found")

    const user = new User(
      model.id,
      model.email,
      model.password,
      model.name,
    )

    return user
  }

	async findAll(): Promise<User[]> {
		throw new Error("Method not implemented!")
	}
	async create(entity: User): Promise<void> {
		throw new Error("Method not implemented!")
	}
	async update(entity: User): Promise<void> {
		throw new Error("Method not implemented!")
	}
	async find(id: string): Promise<User> {
		throw new Error("Method not implemented!")
	}
}
