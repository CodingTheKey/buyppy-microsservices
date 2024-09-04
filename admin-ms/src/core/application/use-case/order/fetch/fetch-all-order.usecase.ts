import { OrderMapper } from "../../../../domain/order/mapper"
import { OrderRepositoryInterface } from "../../../../infra/order/repository/order-repository.interface"

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