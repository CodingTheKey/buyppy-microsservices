import { OrderRepositoryInterface } from "../../../infra/order/repository/order-repository.interface";

export class CancelOrderUseCase {
  private orderRepository: OrderRepositoryInterface

  constructor(
    orderRepository: OrderRepositoryInterface
  ) {
    this.orderRepository = orderRepository
  }

  async execute(id: string) {
    const order = this.orderRepository.find(id)

    const output = this.orderRepository.update()
  }
}