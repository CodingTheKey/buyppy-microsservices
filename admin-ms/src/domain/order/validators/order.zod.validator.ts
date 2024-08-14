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

      refundedAt: z.date().nullable().optional(),
      refundReason: z.string().nullable().optional(),

      canceledAt: z.date().nullable().optional(),
      canceleReason: z.string().nullable().optional(),

      createdAt: z.date().nullable().optional(),
      updatedAt: z.date().nullable().optional(),
      deletedAt: z.date().nullable().optional(),
		});

		orderSchema.parse(entity);
	}
}
