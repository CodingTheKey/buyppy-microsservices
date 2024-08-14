import { Order } from "../../../domain/order/entity/order";
import { OrderItem } from "../../../domain/order/value-objects/order-item";
import { OrderRepositoryInterface } from "../../../infra/order/repository/order-repository.interface";
import { InputCancelOrderDTO } from "./input-cancel-order.dto";

export class CancelOrderUseCase {
  private orderRepository: OrderRepositoryInterface

  constructor(
    orderRepository: OrderRepositoryInterface
  ) {
    this.orderRepository = orderRepository
  }

  async execute(id: string, input: InputCancelOrderDTO) {
    const model = await this.orderRepository.find(id)

    const items = model.items.map(i => new OrderItem(
      i.id,
      i.orderId,
      i.productId,
      i.quantity,
      i.price,
      i.createdAt
    ))
    const order = new Order(
      model.id,
      model.clientId,
      model.status,
      model.total,
      items,
      model.refundedAt,
      model.refundReason,
      model.canceledAt,
      model.canceleReason,
      model.createdAt,
      model.updatedAt,
      model.deletedAt
    )

    order.cancelOrder(
      input.cancelReason
    )

    const output = await this.orderRepository.update(order)

    return output
  }
}