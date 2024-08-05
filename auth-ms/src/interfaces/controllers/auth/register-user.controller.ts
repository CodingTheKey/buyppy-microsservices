import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository";
import type { Context } from "../../../types";
import type { RegisterClientDTO } from "../../../use-case/user/create/register-client.dto";
import { RegisterUserUseCase } from "../../../use-case/user/create/register-client.usecase";

export class RegisterUserController {
	async register(c: Context) {
		try {
			const input = await c.req.json<RegisterClientDTO>();
			console.log("🚀 ~ RegisterUserController ~ register ~ input:", input)

			const registerClientDTO: RegisterClientDTO = {
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

			const usercase = new RegisterUserUseCase(new ClientRepository());
			const result = await usercase.execute(registerClientDTO, c.env.JWT_SECRET);

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
