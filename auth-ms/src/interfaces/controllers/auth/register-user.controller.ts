import { UserRepository } from "../../../infra/user/repository/prisma/user.repository";
import type { Context } from "../../../types";
import type { RegisterUserDTO } from "../../../use-case/user/create/register-user.dto";
import { RegisterUserUseCase } from "../../../use-case/user/create/register-user.usecase";

export class RegisterUserController {
	async register(c: Context) {
		try {
			const input = await c.req.json<RegisterUserDTO>();
			console.log("🚀 ~ RegisterUserController ~ register ~ input:", input)

			const RegisterUserDto: RegisterUserDTO = {
				email: input.email,
				name: input.name,
				password: input.password,
				document: input.document,
				phone: input.phone,
				address: {
					street: input.address.street,
					number: input.address.number,
					zip_code: input.address.zip_code,
				},
			};

			const usercase = new RegisterUserUseCase(new UserRepository());
			const result = await usercase.execute(RegisterUserDto, c.env.JWT_SECRET);

			return new Response(JSON.stringify(result));
		// biome-ignore lint/suspicious/noExplicitAny: <error must be of type any in all cases>
		} catch (err: any) {
			console.error(err);
			return new Response(JSON.stringify({ message: JSON.parse(err.message) }), {
				status: 400,
			});
		}
	}
}
