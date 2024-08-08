import Client from "../../../domain/client/entity/client";
import { Address } from "../../../domain/client/value-object/address";
import type { ClientRepositoryInterface } from "../../../infra/client/repository/prisma/client-repository.interface";
import type { InputUpdateClientDTO } from "./input-update-client.dto";

export class UpdateClientUseCase {
  private clientRepository: ClientRepositoryInterface;

	constructor(clientRepository: ClientRepositoryInterface) {
		this.clientRepository = clientRepository;
	}

  async execute(input: InputUpdateClientDTO) {
    const address = new Address(
      input.address.id,
      input.address.street,
      input.address.number,
      input.address.zipCode
    )
    const client = new Client(
      input.id,
      input.document,
      input.phone,
      input.email,
      input.name,
      input.observations,
      address
    )
    this.clientRepository.update(client)
  }
}
