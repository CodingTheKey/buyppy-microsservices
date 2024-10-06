import { Entity } from "../../domain/entity/entity/product"
import { RepositoryInterface } from "../../repositories/product-repository.interface"

export class CreateOrderUseCase {
  private readonly orderRepository: RepositoryInterface

  constructor (orderRepository: RepositoryInterface) {
    this.orderRepository = orderRepository
  }

  execute(input: unknown) {
    const product = new Entity(input)

    return this.orderRepository.create(product)
  }
}