import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import type { Context } from "../../../../types";
import { ClientRepository } from "../../../application/repositories/client/prisma/client.repository";
import type { RegisterClientDTO } from "../../../application/use-case/client/create/register-client.dto";
import { RegisterUserUseCase } from "../../../application/use-case/client/create/register-client.usecase";

export class RegisterUserController {
  @HTTPExceptionHandler()
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
					city: input.address.city,
					street: input.address.street,
					number: input.address.number,
					zipCode: input.address.zipCode,
				},
			};

			const usecase = new RegisterUserUseCase(new ClientRepository());
			const result = await usecase.execute(registerClientDTO);

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
