import { sign } from "hono/jwt";
import type { UserRepositoryInterface } from "../../../infra/user/repository/prisma/user-repository.interface";
import { ComparePassword } from "../../../utils/compare-passwors";
import type { AuthenticateUserDTO } from "./auth-user.dto";

export class AuthenticateUser {
	private userRepository: UserRepositoryInterface;

	constructor(userRepository: UserRepositoryInterface) {
		this.userRepository = userRepository;
	}

	async execute(input: AuthenticateUserDTO, JWT_SECRET: string) {
		const comparePassword = new ComparePassword();

		const user = await this.userRepository.findByEmail(input.email);

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
