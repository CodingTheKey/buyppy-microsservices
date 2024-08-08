import { Product } from "../../../../domain/product/entity/product";
import { prisma } from "../../../db/prisma/primsa";
import type { ProductRepositoryInterface } from "./product-repository.interface";

export class ProductRepository implements ProductRepositoryInterface {
	async findAll(): Promise<Product[]> {
		const model = await prisma.product.findMany()

		const products = model.map((p) => new Product(
			p.id,
			p.name,
			p.code,
			p.cost,
			p.price,
			p.promotionalPrice,
			p.category
		))

		return products
	}

	async create(entity: Product): Promise<void> {
		await prisma.product.create({
			data: {
				id: entity.id,
				category: entity.category,
				code: entity.code,
				cost: entity.cost,
				name: entity.name,
				price: entity.price,
				promotionalPrice: entity.promotionalPrice
			}
		})
	}

	async update(entity: Product): Promise<void> {
		await prisma.product.update({
			data: {
				id: entity.id,
				category: entity.category,
				code: entity.code,
				cost: entity.cost,
				name: entity.name,
				price: entity.price,
				promotionalPrice: entity.promotionalPrice
			},
			where: {
				id: entity.id
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

			model.createdAt,
			model.updatedAt,
			model.deletedAt
		)

		return product
	}

	async delete(id: string): Promise<void> {
		console.log(id)
		await prisma.product.delete({
			where: {
				id
			}
		})
	}
}
