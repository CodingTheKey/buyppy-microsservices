import { z } from "zod";
import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import { Order } from "../entity/order";
import { OrderItemZodValidator } from "./order-item.zod.validator";

export class OrderZodValidator implements ValidatorInterface<Order> {
	validate(entity: Order) {
   const orderItem = new OrderItemZodValidator()

		const orderSchema = z.object({
      id: z.string(),
      // clientId: z.string(),
      status: z.string().nullable(),
      total: z.number(),
      items: z.array(orderItem.orderItemSchema),

      refundReason: z.string().nullable().optional(),

      canceleReason: z.string().nullable().optional(),
		});

		orderSchema.parse(entity);
	}
}
