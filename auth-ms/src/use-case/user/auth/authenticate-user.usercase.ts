import { sign } from "hono/jwt";
import type { ClientRepositoryInterface } from "../../../infra/client/repository/client/prisma/client-repository.interface";
import { ComparePassword } from "../../../utils/compare-passwors";
import type { AuthenticateUserDTO } from "./auth-user.dto";

export class AuthenticateUser {
	private clientRepository: ClientRepositoryInterface;

	constructor(userRepository: ClientRepositoryInterface) {
		this.clientRepository = userRepository;
	}

	async execute(input: AuthenticateUserDTO, JWT_SECRET: string) {
		const comparePassword = new ComparePassword();

		const user = await this.clientRepository.findByEmail(input.email);

		const isPasswordValid = await comparePassword.execute(
			{ password: input.password, encrypted_password: user.password },
			JWT_SECRET,
		);

		if (!user || !isPasswordValid) {
			throw new Error("Invalid email or password");
		}

		const token = await sign(
			{ id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
			"your_jwt_secret",
			"HS256",
		);
		return { user, token };
	}
}
