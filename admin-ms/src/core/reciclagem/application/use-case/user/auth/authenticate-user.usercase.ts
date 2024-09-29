import { sign } from "@tsndr/cloudflare-worker-jwt";
import { ComparePassword } from "../../../../../utils/compare-passwors";
import { UserRepositoryInterface } from "../../../repositories/user/user-repository.interface";
import { UserMapper } from "../mapper/auth.mapper";
import type { InputAuthenticateUserDTO } from "./auth-user.dto";

export class AuthenticateUserUseCase {
	private userRepository: UserRepositoryInterface;

	constructor(userRepository: UserRepositoryInterface) {
		this.userRepository = userRepository;
	}

	async execute(input: InputAuthenticateUserDTO, JWT_SECRET: string) {
		const comparePassword = new ComparePassword();

		const user = await this.userRepository.findByEmail(input.email);

		const isPasswordValid = await comparePassword.execute(
			{ password: input.password, encrypted_password: user.password },
		);

		if (!user || !isPasswordValid) {
			throw new Error("Invalid email or password");
		}

		const token = await sign(
			{ id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 60 * 60 },
			JWT_SECRET,
			"HS256",
		);

		return { data: UserMapper.execute(user), token };
	}
}
