import { Order } from "../../../../domain/order/entity/order";
import { OrderMapper } from "../../../../domain/order/mapper";
import { OrderItem } from "../../../../domain/order/value-objects/order-item";
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
  async update(entity: Order): Promise<void> {
    console.log(OrderMapper.execute(entity))
    const order = OrderMapper.execute(entity)
    await prisma.order.update({
      where: {
        id: entity.id
      },
      data: {
        id: order.id,
        clientId: order.clientId,
        status: order.status,
        total: order.total,

        refundedAt: order.refundedAt,
        refundReason: order.refundReason,

        canceledAt: order.canceledAt,
        cancelReason: order.canceleReason,

        createdAt: order.createdAt ?? new Date(),
        updatedAt: new Date(),
        deletedAt: order.deletedAt,
      }
    })
  }
  async find(id: string): Promise<Order> {
    const model = await prisma.order.findFirst({
      where: {
        id
      },
      include: {
        items: true
      }
    })

    if (!model) throw new Error('Order not found!')

    const items = model?.items.map(i => new OrderItem(
      i.id,
      i.orderId,
      i.productId,
      i.quantity,
      i.price,
      i.createdAt
    ))
    const order = new Order(
      model.id,
      model.clientId,
      model.status,
      model.total,
      items,
      model.refundedAt,
      model.refundReason,
      model.canceledAt,
      model.cancelReason,
      model.createdAt,
      model.updatedAt,
      model.deletedAt
    )

    return order
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}