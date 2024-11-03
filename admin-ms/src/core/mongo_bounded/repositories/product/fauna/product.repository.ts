export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
import { fql } from 'fauna';
import { Attribute } from '../../../../domain/product/value-objects/attribute';
import { Entity } from '../../../domain/entity/entity/product';
import { fauna } from '../../../infra/db/fauna/fauna';
import { RepositoryInterface } from '../../product-repository.interface';

export class ProductRepository implements RepositoryInterface {
	async create(entity: Entity): Promise<void | Entity> {
		console.log('product', JSON.stringify(entity.props))
		const query = fql`
			let collection = Collection("products")
			collection.create(${entity.props as any})
		`
		await fauna.query(query)
	}
	async findAll(): Promise<Entity[]> {
		const query = fql`
			let collection = Collection("products")
			collection.all()
		`;
		const productsModel = await fauna.query(query)

		if (productsModel.data.data.length === 0)
			throw new Error('Products not found')

		const products: Entity[] = []

		productsModel.data.data.map((product: any) => {
			products.push(new Entity(product))
		})

		return products
	}

	async createWithAttributes(product: Entity, attributes: Attribute[]): Promise<void> {
		throw new Error("Method not implemented!")
	}

	async update(product: Entity): Promise<void> {
		throw new Error("Method not implemented!")
	}

	async find(id: string): Promise<Entity> {
    throw new Error("Method not implemented!")
	}

	async delete(id: string): Promise<void> {
		throw new Error("Method not implemented!")
	}
}