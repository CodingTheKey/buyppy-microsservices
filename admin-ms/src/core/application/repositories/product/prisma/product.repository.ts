import { v4 as uuid } from 'uuid';
import { Product } from '../../../../domain/product/entity/product';
import { Attribute } from '../../../../domain/product/value-objects/attribute';
import { prisma } from '../../../../infra/db/prisma/primsa';
import type { ProductRepositoryInterface } from "../product-repository.interface";

export class ProductRepository implements ProductRepositoryInterface {
	create(entity: Product): Promise<void | Product> {
		throw new Error("Method not implemented.");
	}
	async findAll(): Promise<Product[]> {
		const model = await prisma.product.findMany({
			include: {
				attributes: {
					include: {
						ProductStock: {
							select: {
								productAttributeId: true,
								quantity: true
							}
						},
						attribute: {
							select: {
								key: true,
							}
						},
					}
				},
			}
		})

		const products = model.map((p) => new Product(
			p.id,
			p.name,
			p.code,
			p.cost,
			p.price,
			p.promotionalPrice,
			p.category,
			p.attributes.map((a) => new Attribute(
				a.id,
				a.attribute.key,
				a.value,
				a.ProductStock.filter((s) => s.productAttributeId === a.id).at(0)?.quantity ?? 0)
			)
		))

		return products
	}

	async createWithAttributes(product: Product, attributes: Attribute[]): Promise<void> {
		await prisma.$transaction(async (tx) => {
			await tx.product.create({
				data: {
					id: product.id,
					category: product.category,
					code: product.code,
					cost: product.cost,
					name: product.name,
					price: product.price,
					promotionalPrice: product.promotionalPrice,
				}
			})

			const productAttributesFormatted = attributes.map((a) => {
				return {
					id: uuid(),
					attributeId: a.id,
					productId: product.id,
					value: a.value,
					createdAt: new Date(),
					quantity: a.stockQuantity
				}
			})
			await tx.productAttribute.createMany({
				data: productAttributesFormatted.map((a) => {
					return {
						id: a.id,
						attributeId: a.attributeId,
						productId: a.productId,
						value: a.value,
						createdAt: new Date(),
					}
				})
			})

			await tx.productStock.createMany({
				data: productAttributesFormatted.map((a) => {
					return {
						id: uuid(),
						productAttributeId: a.id,
						quantity: a.quantity,
					}
				})
			})
		})
	}

	async update(product: Product): Promise<void> {
		await prisma.$transaction(async (tx) => {
			await tx.product.update({
				data: {
					category: product.category,
					code: product.code,
					cost: product.cost,
					name: product.name,
					price: product.price,
					promotionalPrice: product.promotionalPrice
				},
				where: {
					id: product.id
				}
			})

			for (const a of product.attributes) {
				await tx.productAttribute.update({
					where: {
						id: a.id,
					},
					data: {
						value: a.value,
					},
				})
				await tx.productStock.update({
					where: {
						id: a.stockId ?? '',
					},
					data: {
						quantity: a.stockQuantity
					}
				})
			}
		})
	}

	async find(id: string): Promise<Product> {
		const model = await prisma.product.findFirst({
			where: {
				id
			}
		})

		if (!model) throw new Error("Product not found")

		const product = new Product(
			model.id,
			model.name,
			model.code,
			model.cost,
			model.price,
			model.promotionalPrice,
			model.category,
		)

		const attributes = await prisma.productAttribute.findMany({
			where: {
				productId: model.id
			}
		})

		return product
	}

	async delete(id: string): Promise<void> {
		await prisma.product.delete({
			where: {
				id
			}
		})
	}
}