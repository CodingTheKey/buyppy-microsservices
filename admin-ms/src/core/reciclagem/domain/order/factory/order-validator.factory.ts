import ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import { Order } from "../entity/order";
import { OrderZodValidator } from "../validators/order.zod.validator";

export class OrderValidatorFactory {
	static create(): ValidatorInterface<Order> {
		return new OrderZodValidator();
	}
}