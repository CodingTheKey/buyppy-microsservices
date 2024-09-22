import * as jwt from "@tsndr/cloudflare-worker-jwt"
import { Context, Next } from "hono"
import { HTTPExceptionHandler } from "../../../decorators/http-exceptions-handler.decorator"

export class AuthMiddleware {
	@HTTPExceptionHandler('Error in authentication')
	static async execute(c: Context, next: Next) {
		const authHeader = c.req.header('Authorization')

		if (!authHeader || !authHeader.startsWith('Bearer '))
			throw new Error('Token not found or not valid!')

		const token = authHeader.split(' ')[1]

		const isValid = await jwt.verify(token, c.env.JWT_SECRET)

		if (!isValid) throw new Error('Token not valid!')

		const payload = jwt.decode(token)

		console.log(payload)

		c.set('user', payload)

		await next()
	}
}