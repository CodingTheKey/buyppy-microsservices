import { Order } from "./entity/order";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class OrderMapper {
  static execute(order: Order) {
    return {
      id: order.id,
      clientId: order.clientId,
      status: order.status,
      total: order.total,

      items: order.items.map(i => ({
        orderId: i.orderId,
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,

        createdAt: i.createdAt,
      })),

      refundedAt: order.refundedAt,
      refundReason: order.refundReason,

      canceledAt: order.canceledAt,
      canceleReason: order.canceleReason,

      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deletedAt: order.deletedAt,
    }
  }
}
