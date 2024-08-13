import { Entity } from "../../@shared/entity/entity-abstract";
import { AddressZodValidator } from "../validators/address.zod.validator";

export class Address extends Entity {
	private _street: string;
	private _number: number;
	private _zip_code: string;
	private _city: string

	constructor(id: string, street: string, number: number, zip_code: string, city: string) {
		super();
		this._id = id;
		this._street = street;
		this._number = number;
		this._zip_code = zip_code;
		this._city = city

		this.validate()
	}

	validate() {
		const addressValidator = new AddressZodValidator();
		addressValidator.validate(this);
	}

	get street(): string{
		return this._street
	}

	get number(): number {
		return this._number
	}

	get zipCode(): string {
		return this._zip_code
	}

	get city(): string {
		return this._city
	}
}
