import { OrderMapper } from "../../../../domain/order/mapper"
import { OrderRepositoryInterface } from "../../../../infra/order/repository/order-repository.interface"

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