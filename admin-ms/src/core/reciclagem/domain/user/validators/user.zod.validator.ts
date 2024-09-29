import { z } from "zod";
import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import { User } from "../entity/User";

export class UserZodValidator implements ValidatorInterface<User> {
	validate(entity: User) {
		const userSchema = z.object({
			id: z.string(),
			email: z.string(),
			password: z.string(),
			name: z.string(),
		});

		userSchema.parse(entity);
	}
}
