import { Order } from "../../../../domain/order/entity/order";
import { OrderMapper } from "../../../../domain/order/mapper";
import { OrderItem } from "../../../../domain/order/value-objects/order-item";
import { prisma } from "../../../../infra/db/prisma/primsa";
import { OrderRepositoryInterface } from "../order-repository.interface";

export class PrismaOrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    if (entity.paymentMethod === null || entity.paymentMethod === '')
      throw new Error('Payment method or discount percent not found.');

    await prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          id: entity.id,
          clientId: entity.clientId ?? null,
          status: entity.status,
          discountPercent: entity.discountPercent ?? null,
          paymentMethod: entity.paymentMethod ?? null,

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

      for (const i of entity.items) {
        const productStock = await tx.productStock.findFirst({
          where: {
            productAttributeId: i.productAttributeId ?? ''
          }
        })

        if (!productStock) {
          throw new Error('Product stock not found.');
        }

        if (productStock.quantity < i.quantity) {
          throw new Error('Product stock not enough.');
        }

        await tx.productStock.update({
          where: {
            id: productStock?.id
          },
          data: {
            quantity: {
              decrement: i.quantity
            }
          }
        })
      }
    })
  }
  async update(entity: Order): Promise<void> {
    // const order = OrderMapper.execute(entity)
    await prisma.order.update({
      where: {
        id: entity.id
      },
      data: {
        id: entity.id,
        clientId: entity.clientId,
        status: entity.status,
        total: entity.total,

        refundReason: entity.refundReason,

        canceledAt: entity.canceledAt,
        cancelReason: entity.canceleReason,

        updatedAt: new Date(),
      }
    })
  }
  async find(id: string): Promise<Order> {
    const model = await prisma.order.findFirst({
      where: {
        id
      },
      include: {
        client: {
          select: {
            name: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    if (!model) throw new Error('Order not found!')

    const items = model?.items.map(i => new OrderItem(
      i.id,
      i.product.name,
      i.orderId,
      i.productId,
      i.quantity,
      i.price,
    ))
    const order = new Order(
      model.id,
      model.clientId,
      model.status,
      model.total,
      items,
      model.client?.name,
      model.refundReason,
      model.cancelReason,

      model.discountPercent,
      model.paymentMethod
    )

    return order
  }
  async findAll(): Promise<Order[]> {
    const model = await prisma.order.findMany({
      include: {
        client: {
          select: {
            name: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    const orders = model.map((o) => {
      const items = o?.items.map(i => new OrderItem(
        i.id,
        i.product.name,
        i.orderId,
        i.productId,
        i.quantity,
        i.price,
      ))
      const order = new Order(
        o.id,
        o.clientId,
        o.status,
        o.total,
        items,
        o.client?.name,
        o.refundReason,
        o.cancelReason,

        o.discountPercent,
        o.paymentMethod
      )

      order.setCreatedAt(o.createdAt)

      return order
    })

    return orders
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}