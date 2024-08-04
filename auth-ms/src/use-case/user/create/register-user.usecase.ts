import { sign } from "hono/jwt";
import { v4 as uuid } from "uuid";
import User from "../../../domain/user/entity/user";
import { Address } from "../../../domain/user/value-object/address";
import type { UserRepositoryInterface } from "../../../infra/user/repository/prisma/user-repository.interface";
import { Hash } from "../../../utils/hash";
import type { RegisterUserDTO } from "./register-user.dto";

export class RegisterUserUseCase {
	private userRepository: UserRepositoryInterface;

	constructor(userRepository: UserRepositoryInterface) {
		this.userRepository = userRepository;
	}

	async execute(input: RegisterUserDTO, JWT_SECRET: string) {
		const hash = new Hash();

		const address = new Address(
			uuid(),
			input.address.street,
			input.address.number,
			input.address.zip_code,
		);
		
		const hashedPassword = await hash.execute(input.password, JWT_SECRET);
		const user = new User(
			uuid(),
			input.document,
			input.phone,
			input.email,
			input.name,
			hashedPassword,
			new Date(),

			address,
		);

		await this.userRepository.create(user);

		const token = sign(
			{ id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
			"your_jwt_secret",
			"HS256",
		);
		return { user, token };
	}
}
