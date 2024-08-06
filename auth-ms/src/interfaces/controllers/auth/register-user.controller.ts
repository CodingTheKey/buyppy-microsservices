import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository";
import type { Context } from "../../../types";
import type { RegisterClientDTO } from "../../../use-case/client/create/register-client.dto";
import { RegisterUserUseCase } from "../../../use-case/client/create/register-client.usecase";

export class RegisterUserController {
	async register(c: Context) {
		try {
			const input = await c.req.json<RegisterClientDTO>();

			const registerClientDTO: RegisterClientDTO = {
				email: input.email,
				name: input.name,
				password: input.password,
				document: input.document,
				phone: input.phone,
				observations: input.observations,
				address: {
					street: input.address.street,
					number: input.address.number,
					zip_code: input.address.zip_code,
				},
			};

			console.log(registerClientDTO)

			const usercase = new RegisterUserUseCase(new ClientRepository());
			const result = await usercase.execute(registerClientDTO, c.env.JWT_SECRET);

			const response = {
				data: result,
			}

			return c.newResponse(JSON.stringify(response), 201);
		// biome-ignore lint/suspicious/noExplicitAny: <error must be of type any in all cases>
		} catch (err: any) {
			console.error(err);
			return new Response(JSON.stringify({ message: JSON.parse(err.message) }), {
				status: 400,
			});
		}
	}
}
