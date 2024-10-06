import { fql } from 'fauna';
import { Attribute } from '../../../../domain/product/value-objects/attribute';
import { Entity } from '../../../domain/entity/entity/product';
import { fauna } from '../../../infra/db/fauna/fauna';
import { RepositoryInterface } from '../../product-repository.interface';

export class OrderRepository implements RepositoryInterface {
	async create(entity: Entity): Promise<void | Entity> {
    // const schema = fql`
		// 	let collection = Collection("schemas")
		// 	collection.all()
    // `
		// return console.log(await fauna.query(schema))
		const query = fql`
      let product = Collection("products").byId(${entity.props.productId})
			Collection("orders").create({ productId: product, weight: 10, totalPrice: 10 })
		`
		await fauna.query(query)
	}

	async findAll(): Promise<Entity[]> {
		const query = fql`
			let collection = Collection("orders")
			collection.all()
		`;
		const ordersModel = await fauna.query(query)

		const orders: Entity[] = []

		ordersModel.data.data.map((product: any) => {
			orders.push(new Entity(product))
		})

		return orders
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