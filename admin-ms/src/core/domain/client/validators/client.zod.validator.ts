import { z } from "zod";
import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import type User from "../entity/client";

export class ClientZodValidator implements ValidatorInterface<User> {
	validate(entity: User) {
		const userSchema = z.object({
			document: z.string(),
			phone: z.string(),
			email: z.string(),
			name: z.string()
		});

		userSchema.parse(entity);
	}
}
