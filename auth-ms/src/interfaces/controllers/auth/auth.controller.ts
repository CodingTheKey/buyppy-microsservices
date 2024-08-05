import { ClientRepository } from "../../../infra/client/repository/client/prisma/client.repository";
import type { Context } from "../../../types";
import type { AuthenticateUserDTO } from "../../../use-case/user/auth/auth-user.dto";
import { AuthenticateUser } from "../../../use-case/user/auth/authenticate-user.usercase";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthController {
	static async execute(c: Context) {
		try {
			const { email, password } = await c.req.json<AuthenticateUserDTO>();

			const authenticateUser = new AuthenticateUser(new ClientRepository());
			const result = await authenticateUser.execute(
				{ email, password },
				c.env.JWT_SECRET,
			);

			return new Response(JSON.stringify(result));
		// biome-ignore lint/suspicious/noExplicitAny: <error must be of type any in all cases>
		} catch (err: any) {
			console.error(err);
			return new Response(JSON.stringify({ message: err.message }), {
				status: 400,
			});
		}
	}
}
