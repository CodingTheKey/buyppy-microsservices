import { OrderRepositoryInterface } from "../../../infra/order/repository/order-repository.interface"

export class CreateOrderUseCase {
  private orderRepository: OrderRepositoryInterface

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository
  }

  async execute() {

  }
}