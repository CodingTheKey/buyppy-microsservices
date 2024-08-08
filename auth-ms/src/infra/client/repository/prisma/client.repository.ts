import { v4 as uuidv4 } from "uuid";
import Client from "../../../../domain/client/entity/client";
import { Address } from "../../../../domain/client/value-object/address";
import { prisma } from "../../../db/prisma/primsa";
import type { ClientRepositoryInterface } from "./client-repository.interface";

export class ClientRepository implements ClientRepositoryInterface {
	async fetchByOrganizationId(organization_id: string): Promise<Client[]> {
		const users = await prisma.client.findMany({
			include: {
				address: true,
			},
		});

		const result = users.map((user) => {
			if (!user) throw new Error("User not found.");
			if (!user.address)
				throw new Error("User has not address, please update user.");

			const address = new Address(
				user.id,
				user.address.street,
				user.address.number,
				user.address.zipCode,
			);

			const userEntity = new Client(
				user.id,
				user.document,
				user.phone,
				user.email,
				user.name,
				new Date(),
				user.observations,

				address,
			);

			return userEntity;
		})

		return result
	}
	async findByEmail(email: string): Promise<Client> {
		const user = await prisma.client.findFirst({
			where: {
				email,
			},
			include: {
				address: true,
			},
		});

		if (!user) throw new Error("User not found.");
		if (!user.address)
			throw new Error("User has not address, please update user.");

		const address = new Address(
			user.id,
			user.address.street,
			user.address.number,
			user.address.zipCode,
		);

		const userEntity = new Client(
			user.id,
			user.document,
			user.phone,
			user.email,
			user.name,
			new Date(),

			user.observations,

			address,
		);

		return userEntity;
	}

	async create(entity: Client): Promise<void> {
		let userVerifier!: Client;
		try {
			userVerifier = await this.findByEmail(entity.email);
		} catch (err) {}

		if (userVerifier && userVerifier.email.length >= 1)
			throw new Error("User email already registered");

		const address = await prisma.address.create({
			data: {
				street: entity.address.id,
				number: entity.address.number,
				zipCode: entity.address.zipCode,
				id: uuidv4(),
			},
		});

		await prisma.client.create({
			data: {
				id: entity.id,
				document: entity.document,
				email: entity.email,
				name: entity.name,
				addressId: address.id,
				createdAt: new Date(),
				phone: entity.phone,
				observations: entity.observations
			},
		});
	}

	findAll(): Promise<Client[]> {
		throw new Error("Method not implemented.");
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

	async find(id: string): Promise<Client> {
		const model = await prisma.client.findFirst({
			where: {
				id
			},
			include: {
				address: true
			}
		})

		if (!model) throw new Error("Product not found")

		const address = new Address(
			model.address.id,
			model.address.street,
			model.address.number,
			model.address.zipCode
		)

		const client = new Client(
			model.id,
			model.document,
			model.phone,
			model.email,
			model.name,
			model.createdAt,
			model.observations,
			address
		)

		return client
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
