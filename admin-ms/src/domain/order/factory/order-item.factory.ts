import { v4 as uuid } from "uuid";
import { OrderItem } from "../value-objects/order-item";

export class OrderItemFactory {
  public static create(
    orderId: string,
    productId: string,
    quantity: number,
    price: number,
    productAttributeId: string | null = null,
  ): OrderItem {
    return new OrderItem(
      uuid(),
      orderId,
      productId,
      quantity,
      price,
      productAttributeId
    )
  }
}