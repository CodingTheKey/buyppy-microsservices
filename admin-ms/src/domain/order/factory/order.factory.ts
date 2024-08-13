import { v4 as uuid } from "uuid";
import { Order } from "../entity/order";
import { OrderItem } from "../value-objects/order-item";

export class OrderFactory {
  public static create(
    clientId: string,
    status: string | null,
    total: number,
    items: OrderItem[],

    refundedAt: Date,
    refundReason: string,

    canceledAt: Date,
    canceleReason: string,

    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ): Order {
    return new Order(
      uuid(),
      clientId,
      status,
      total,
      items,

      refundedAt,
      refundReason,

      canceledAt,
      canceleReason,

      createdAt,
      updatedAt,
      deletedAt,
    )
  }
}