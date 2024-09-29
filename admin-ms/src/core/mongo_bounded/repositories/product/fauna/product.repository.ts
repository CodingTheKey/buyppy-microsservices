export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
import { fql } from 'fauna';
import { Attribute } from '../../../../domain/product/value-objects/attribute';
import { Product } from '../../../domain/product/entity/product';
import { fauna } from '../../../infra/db/fauna/fauna';
import { JsonToZodSchema } from '../../../utils/generate-zod-from-json';
import { ProductRepositoryInterface } from '../product-repository.interface';

export class ProductRepository implements ProductRepositoryInterface {
	create(entity: Product): Promise<void | Product> {
		throw new Error("Method not implemented.");
	}
	async findAll(): Promise<Product[]> {
		const querySchema = fql`
			let collection = Collection("schemas")
			collection.all()
		`;
		const schema = await fauna.query(querySchema)

		const query = fql`
			let collection = Collection("products")
			collection.all()
		`;
		const productsModel = await fauna.query(query)

		if (productsModel.data.data.length === 0)
			throw new Error('Products not found')

		const products: Product[] = []

		productsModel.data.data.map((product: any) => {
			products.push(new Product(JsonToZodSchema.generate(schema.data.data[0].validator), product))
		})

		return products
	}

	async createWithAttributes(product: Product, attributes: Attribute[]): Promise<void> {
		throw new Error("Method not implemented!")
	}

	async update(product: Product): Promise<void> {
		throw new Error("Method not implemented!")
	}

	async find(id: string): Promise<Product> {
    throw new Error("Method not implemented!")
	}

	async delete(id: string): Promise<void> {
		throw new Error("Method not implemented!")
	}
}