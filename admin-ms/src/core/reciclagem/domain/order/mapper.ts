import { Order } from "./entity/order";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class OrderMapper {
  static execute(order: Order) {
    return {
      id: order.id,
      clientId: order.clientId,
      status: order.status,
      total: order.total,
      clientName: order.clientName,

      discountPercent: order.discountPercent,
      paymentMethod: order.paymentMethod,

      items: order.items.map(i => ({
        orderId: i.orderId,
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
        name: i.productName
      })),

      refundReason: order.refundReason,

      canceleReason: order.canceleReason,

      createdAt: order.createdAt,
    }
  }
}
