import { Entity } from "../../@shared/entity/entity-abstract";
import { UserValidatorFactory } from "../factory/user-validator.factory";
import type { Address } from "../value-object/address";

export default class Client extends Entity {
	private _document: string;
	private _phone: string;
	private _email: string;
	private _name: string;
	private _createdAt: Date | null;
	private _observations: string;

	private _address: Address;

	constructor(
		id: string,
		document: string,
		phone: string,
		email: string,
		name: string,
		observations: string,

		address: Address,

		created_at: Date | null = null,
	) {
		super();
		this._id = id;
		this._document = document;
		this._phone = phone;
		this._name = name;
		this._email = email;
		this._createdAt = created_at

		this._observations = observations

		this._address = address

		this.validate();
	}

	validate() {
		UserValidatorFactory.create().validate(this);
	}

	get document(): string {
		return this._document
	}

	get email(): string {
		return this._email
	}

	get name(): string {
		return this._name
	}

	get address(): Address {
		return this._address
	}

	get phone(): string {
		return this._phone
	}

	get observations(): string {
		return this._observations
	}

	get createdAt(): Date | null {
		return this._createdAt
	}
} 
