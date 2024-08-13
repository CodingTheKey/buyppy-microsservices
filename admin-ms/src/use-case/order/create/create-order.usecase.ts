import { OrderRepositoryInterface } from "../../../infra/order/repository/order-repository.interface"
import { InputCreateOrderDTO } from "./input-create-order.dto"

export class CreateOrderUseCase {
  private orderRepository: OrderRepositoryInterface

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository
  }

  async execute(input: InputCreateOrderDTO) {
    // this.orderRepository.create()
  }
}