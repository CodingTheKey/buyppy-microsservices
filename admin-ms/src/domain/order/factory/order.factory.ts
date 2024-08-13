import { v4 as uuid } from "uuid";
import { Order } from "../entity/order";
import { OrderItemFactory } from "./order-item.factory";

export class OrderFactory {
  public static create(
    clientId: string,
    status: string | null,
    total: number,
    items: Array<{
      productId: string,
      quantity: number,
      price: number,

      createdAt: string,
    }>,
  ): Order {
    const orderId = uuid()
    const orderItems = items.map((i) => OrderItemFactory.create(
      orderId,
      i.productId,
      i.quantity,
      i.price,

      new Date(i.createdAt),
    ))
    return new Order(
      orderId,
      clientId,
      status,
      total,
      orderItems,
    )
  }
}