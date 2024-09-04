import ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import { OrderItemZodValidator } from "../validators/order-item.zod.validator";
import { OrderItem } from "../value-objects/order-item";

export class OrderItemValidatorFactory {
	static create(): ValidatorInterface<OrderItem> {
		return new OrderItemZodValidator();
	}
}