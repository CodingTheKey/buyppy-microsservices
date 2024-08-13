import { Order } from "../../../../domain/order/entity/order";
import { prisma } from "../../../db/prisma/primsa";
import { OrderRepositoryInterface } from "../order-repository.interface";

export class PrismaOrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await prisma.order.create({
      data: {
        id: entity.id,
        clientId: entity.clientId,
        status: entity.status,

        items: {
          create: entity.items.map((i) => ({
            id: i.id,
            price: i.price,
            productId: i.productId,
            quantity: i.quantity,
            createdAt: new Date(),
          }))
        },

        total: entity.total,

        createdAt: new Date(),
      }
    })
  }
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}