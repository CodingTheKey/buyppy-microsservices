import { v4 as uuid } from "uuid";
import Client from "../../../domain/client/entity/client";
import { UserMapper } from "../../../domain/client/mapper";
import { Address } from "../../../domain/client/value-object/address";
import type { ClientRepositoryInterface } from "../../../infra/client/repository/prisma/client-repository.interface";
import type { RegisterClientDTO } from "./register-client.dto";

export class RegisterUserUseCase {
	private clientRepository: ClientRepositoryInterface;

	constructor(clientRepository: ClientRepositoryInterface) {
		this.clientRepository = clientRepository;
	}

	async execute(input: RegisterClientDTO) {
		const address = new Address(
			uuid(),
			input.address.street,
			input.address.number,
			input.address.zipCode,
			input.address.city
		);

		const user = new Client(
			uuid(),
			input.document,
			input.phone,
			input.email,
			input.name,
			input.observations,

			address,

			new Date()
		);

		await this.clientRepository.create(user);

		return UserMapper.execute(user)
	}
}
