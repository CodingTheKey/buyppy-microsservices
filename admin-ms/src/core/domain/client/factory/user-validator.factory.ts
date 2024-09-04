import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import type User from "../entity/client";
import { ClientZodValidator } from "../validators/client.zod.validator";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UserValidatorFactory {
	static create(): ValidatorInterface<User> {
		return new ClientZodValidator();
	}
}
