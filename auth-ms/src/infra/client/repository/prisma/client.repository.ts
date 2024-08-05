import { v4 as uuidv4 } from "uuid";
import User from "../../../../domain/user/entity/user";
import type { ClientRepositoryInterface } from "./client-repository.interface";

export class ClientRepository implements ClientRepositoryInterface {
	async fetchByOrganizationId(organization_id: string): Promise<User[]> {
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

			const userEntity = new User(
				user.id,
				user.document,
				user.phone,
				user.email,
				user.name,
				user.password,
				new Date(),

				address,
			);

			return userEntity;
		})

		return result
	}
	async findByEmail(email: string): Promise<User> {
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

		const userEntity = new User(
			user.id,
			user.document,
			user.phone,
			user.email,
			user.name,
			user.password,
			new Date(),

			address,
		);

		return userEntity;
	}

	async create(entity: User): Promise<void> {
		let userVerifier!: User;
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
				password: entity.password,
				addressId: address.id,
				created_at: new Date(),
				phone: entity.phone,
			},
		});
	}

	update(entity: User): Promise<void> {
		throw new Error("Method not implemented.");
	}
	find(id: string): Promise<User> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}
}
