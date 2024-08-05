import { sign } from "hono/jwt";
import { v4 as uuid } from "uuid";
import User from "../../../domain/user/entity/user";
import { Address } from "../../../domain/user/value-object/address";
import type { ClientRepositoryInterface } from "../../../infra/client/repository/prisma/client-repository.interface";
import { Hash } from "../../../utils/hash";
import type { RegisterClientDTO } from "./register-client.dto";

export class RegisterUserUseCase {
	private clientRepository: ClientRepositoryInterface;

	constructor(clientRepository: ClientRepositoryInterface) {
		this.clientRepository = clientRepository;
	}

	async execute(input: RegisterClientDTO, JWT_SECRET: string) {
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

		await this.clientRepository.create(user);

		const token = sign(
			{ id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
			"your_jwt_secret",
			"HS256",
		);
		return { user, token };
	}
}
