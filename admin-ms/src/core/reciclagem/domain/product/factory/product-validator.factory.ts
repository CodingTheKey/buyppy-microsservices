import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import type { Product } from "../entity/product";
import { ProductZodValidator } from "../validators/product.zod.validator";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ProductValidatorFactory {
	static create(): ValidatorInterface<Product> {
		return new ProductZodValidator();
	}
}
