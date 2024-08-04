import { Entity } from "../../@shared/entity/entity-abstract";
import { UserValidatorFactory } from "../factory/user-validator.factory";
import type { Address } from "../value-object/address";

export default class User extends Entity {
	private _document: string;
	private _phone: string;
	private _email: string;
	private _name: string;
	private _password: string
	private _createdAt: Date

	private _address: Address

	constructor(
		id: string,
		document: string,
		phone: string,
		email: string,
		name: string,
		password: string,
		created_at: Date,

		address: Address
	) {
		super();
		this._id = id;
		this._document = document;
		this._phone = phone;
		this._name = name;
		this._email = email;
		this._password = password
		this._createdAt = created_at

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
		return this._name
	}

	get name(): string {
		return this._name
	}

	get password(): string {
		return this._password
	}

	get address(): Address {
		return this._address
	}

	get phone(): string {
		return this._phone
	}
}
