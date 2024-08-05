import type { Product } from "../../../../domain/product/entity/product";
import { prisma } from "../../../db/prisma/primsa";
import type { ProductRepositoryInterface } from "./product-repository.interface";

export class ProductRepository implements ProductRepositoryInterface {
	async findAll(): Promise<Product[]> {
		throw new Error("Method not implemented.");
	}
	async create(entity: Product): Promise<void> {
		const product = prisma.product.create({
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
		throw new Error("Method not implemented.");
	}
	async find(id: string): Promise<Product> {
		throw new Error("Method not implemented.");
	}
}
