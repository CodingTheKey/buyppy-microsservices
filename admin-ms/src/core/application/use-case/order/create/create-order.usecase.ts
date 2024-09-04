import { OrderFactory } from "../../../../domain/order/factory/order.factory"
import { OrderRepositoryInterface } from "../../../../infra/order/repository/order-repository.interface"
import { InputCreateOrderDTO } from "./input-create-order.dto"

export class CreateOrderUseCase {
  private orderRepository: OrderRepositoryInterface

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository
  }

  async execute(input: InputCreateOrderDTO) {
    const order = OrderFactory.create(
      input.clientId,
      input.status,
      input.total,
      input.items
    )

    await this.orderRepository.create(order)
  }
}