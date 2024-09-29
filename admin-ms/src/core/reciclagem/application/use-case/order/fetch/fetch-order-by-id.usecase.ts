import { OrderRepositoryInterface } from "../../../../application/order/repository/order-repository.interface"
import { OrderMapper } from "../../../../domain/order/mapper"

export class FetchOrderById {
  private orderRepository: OrderRepositoryInterface

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository
  }

  async execute(id: string) {
    const order = await this.orderRepository.find(id)

    return OrderMapper.execute(order)
  }
}