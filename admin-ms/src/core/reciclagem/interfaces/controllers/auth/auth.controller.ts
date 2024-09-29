import { HTTPException } from "hono/http-exception";
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import type { Context } from "../../../../types";
import { UserRepository } from "../../../application/repositories/user/prisma/user.repository";
import type { InputAuthenticateUserDTO } from "../../../application/use-case/user/auth/auth-user.dto";
import { AuthenticateUserUseCase } from "../../../application/use-case/user/auth/authenticate-user.usercase";
// import { UserRepository } from "../../../application/user/repository/prisma/user.repository";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthController {
  @HTTPExceptionHandler()
	static async execute(c: Context) {
		try {
			const input = await c.req.json<InputAuthenticateUserDTO>();

			const loginDTO: InputAuthenticateUserDTO = {
				email: input.email,
				password: input.password,
			}; 

			const usecase = new AuthenticateUserUseCase(new UserRepository());
			const result = await usecase.execute(loginDTO, c.env.JWT_SECRET);

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
