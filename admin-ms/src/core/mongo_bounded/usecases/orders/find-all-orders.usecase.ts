import { RepositoryInterface } from "../../repositories/product-repository.interface";
import { OrderMapper } from "./mappers/find-all-orders.mapper";

export class FindAllOrdersUseCase {
  private orderRepository: RepositoryInterface

  constructor (orderRepository: RepositoryInterface) {
    this.orderRepository = orderRepository
  }

  async execute(): Promise<unknown> {
    const orders = await this.orderRepository.findAll()

    const output = orders.map((o) => OrderMapper.execute(o))

    return output
  }
}