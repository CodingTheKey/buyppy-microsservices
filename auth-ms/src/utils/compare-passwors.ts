import { compare } from "bcryptjs";

export class ComparePassword {
	async execute(
		input: {
			password: string;
			encrypted_password: string;
		},
	) {
		const isValid = await compare(input.password, input.encrypted_password)

		if (!isValid) {
			throw new Error("Email ou senha incorretos");
		}

		return isValid
	}
}
