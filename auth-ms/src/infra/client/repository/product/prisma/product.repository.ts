import type { Product } from "../../../../../domain/product/entity/product";
import type { ProductRepositoryInterface } from "./product-repository.interface";

export class UserRepository implements ProductRepositoryInterface {
	async fetchByOrganizationId(organization_id: string): Promise<Product[]> {
		throw new Error("Method not implemented.");
	}
	async findByEmail(email: string): Promise<Product> {
		throw new Error("Method not implemented.");
	}

	async create(entity: Product): Promise<void> {
		throw new Error("Method not implemented.");
	}

	update(entity: Product): Promise<void> {
		throw new Error("Method not implemented.");
	}
	find(id: string): Promise<Product> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<Product[]> {
		throw new Error("Method not implemented.");
	}
}
