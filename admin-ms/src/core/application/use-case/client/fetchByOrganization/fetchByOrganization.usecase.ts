import type { ClientRepositoryInterface } from "../../../../application/client/repository/prisma/client-repository.interface";
import { UserMapper } from "../../../../domain/client/mapper";

export class FetchUserByOrganizationUseCase {
	private userRepository: ClientRepositoryInterface;

	constructor(userRepository: ClientRepositoryInterface) {
		this.userRepository = userRepository;
	}

	async execute(organization_id: string) {
		const result = await this.userRepository.fetchByOrganizationId(organization_id);

		const raw = result.map((u) => UserMapper.execute(u))

		return raw
	}
}
