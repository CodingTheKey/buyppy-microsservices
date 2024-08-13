import { z } from "zod";
import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import { OrderItem } from "../value-objects/order-item";

export class OrderItemZodValidator implements ValidatorInterface<OrderItem> {
  public orderItemSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    price: z.number(),

    createdAt: z.date(),
  });

	validate(entity: OrderItem) {
		this.orderItemSchema.parse(entity);
	}
}
