import { OrderRepositoryInterface } from "../../../../application/order/repository/order-repository.interface"
import { OrderMapper } from "../../../../domain/order/mapper"

export class FetchAllOrdersUseCase {
  private orderRepository: OrderRepositoryInterface

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository
  }

  async execute() {
    const orders = await this.orderRepository.findAll()

    const output = orders.map((o) => OrderMapper.execute(o))

    return output
  }
}