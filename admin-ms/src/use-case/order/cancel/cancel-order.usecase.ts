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
    const order = await this.orderRepository.find(id)

    order.cancelOrder(
      input.cancelReason
    )

    const output = await this.orderRepository.update(order)

    return output
  }
}