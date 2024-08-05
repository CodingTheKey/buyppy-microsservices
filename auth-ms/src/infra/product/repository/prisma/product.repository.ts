import type { Product } from "../../../../../domain/product/entity/product";
import type { ProductRepositoryInterface } from "./product-repository.interface";

export class ProductRepository implements ProductRepositoryInterface {
	async findAll(): Promise<Product[]> {
		throw new Error("Method not implemented.");
	}
	async create(entity: Product): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async update(entity: Product): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async find(id: string): Promise<Product> {
		throw new Error("Method not implemented.");
	}
}
