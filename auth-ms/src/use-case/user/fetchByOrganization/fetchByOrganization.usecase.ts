import { UserMapper } from "../../../domain/user/mapper";
import type { UserRepositoryInterface } from "../../../infra/user/repository/prisma/user-repository.interface";

export class FetchUserByOrganizationUseCase {
	private userRepository: UserRepositoryInterface;

	constructor(userRepository: UserRepositoryInterface) {
		this.userRepository = userRepository;
	}

	async execute(organization_id: string) {
		const result = await this.userRepository.fetchByOrganizationId(organization_id);

		const raw = result.map((u) => UserMapper.execute(u))

		return { data: raw };
	}
}
