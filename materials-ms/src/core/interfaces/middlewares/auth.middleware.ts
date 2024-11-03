import * as jwt from "@tsndr/cloudflare-worker-jwt"
import type { Context, Next } from "hono"
import { HTTPException } from "hono/http-exception"
import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator"

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthMiddleware {
	@HTTPExceptionHandler('Error in authentication')
	static async execute(c: Context, next: Next) {
		const authHeader = c.req.header('Authorization')

		if (!authHeader || !authHeader.startsWith('Bearer '))
			throw new HTTPException(401, { message: 'Token not found or not valid!' })

		console.log(authHeader)

		const token = authHeader.split(' ')[1]

		const isValid = await jwt.verify(token, c.env.JWT_SECRET)

		if (!isValid) throw new HTTPException(401, { message: 'Token not valid!' })

		const payload = jwt.decode(token)

		c.set('user', payload)

		await next()
	}
}