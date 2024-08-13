import { HTTPException } from "hono/http-exception";
import { UserRepository } from "../../../infra/user/repository/prisma/user.repository";
import type { Context } from "../../../types";
import type { InputAuthenticateUserDTO } from "../../../use-case/user/auth/auth-user.dto";
import { AuthenticateUserUseCase } from "../../../use-case/user/auth/authenticate-user.usercase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthController {
	static async execute(c: Context) {
		try {
			const input = await c.req.json<InputAuthenticateUserDTO>();

			const loginDTO: InputAuthenticateUserDTO = {
				email: input.email,
				password: input.password,
			}; 

			const usecase = new AuthenticateUserUseCase(new UserRepository());
			const result = await usecase.execute(loginDTO);

			return c.newResponse(JSON.stringify(result), 200);
		// biome-ignore lint/suspicious/noExplicitAny: <error must be of type any in all cases>
		} catch (e: any) {
			console.error(e);
			throw new HTTPException(400, {
				message: JSON.stringify({
					message: e.message,
					error: e.message
				})
			});
		}
	}
}
