import { z } from "zod";
import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import { Order } from "../entity/order";
import { OrderItemZodValidator } from "./order-item.zod.validator";

export class OrderZodValidator implements ValidatorInterface<Order> {
	validate(entity: Order) {
    const orderItem = new OrderItemZodValidator()

		const orderSchema = z.object({
      id: z.string(),
      clientId: z.string(),
      status: z.string().nullable(),
      total: z.number(),
      items: z.array(orderItem.orderItemSchema),

      refundedAt: z.date(),
      refundReason: z.string(),

      canceledAt: z.date(),
      canceleReason: z.string(),

      createdAt: z.date(),
      updatedAt: z.date(),
      deletedAt: z.date(),
		});

		orderSchema.parse(entity);
	}
}
