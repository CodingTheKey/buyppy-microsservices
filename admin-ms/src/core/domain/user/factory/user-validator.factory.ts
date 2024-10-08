import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import { User } from "../entity/User";
import { UserZodValidator } from "../validators/user.zod.validator";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UserValidatorFactory {
	static create(): ValidatorInterface<User> {
		return new UserZodValidator();
	}
}
