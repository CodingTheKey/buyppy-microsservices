import { ProductValidatorFactory } from "../factory/product-validator.factory";
import { Attribute } from "../value-objects/attribute";

export class Product {
  private _id: string;
  private _name: string;
  private _code: string;
  private _cost: number;
  private _price: number;
  private _promotionalPrice: number | null;
  private _category: string;

  private _createdAt: Date | null;
  private _updatedAt: Date | null;
  private _deletedAt: Date | null;

  private _atributes: Attribute[]

  constructor(
    id: string,
    name: string,
    code: string,
    cost: number,
    price: number,
    promotionalPrice: number | null,
    category: string,

    createAt: Date | null = null,
    updatedAt: Date | null = null,
    deletedAt: Date | null = null,

    atributes: Attribute[] = [],
  ) {
    this._id = id;
    this._name = name;
    this._code = code;
    this._cost = cost;
    this._price = price;
    this._promotionalPrice = promotionalPrice;
    this._category = category;

    this._createdAt = createAt
    this._updatedAt = updatedAt
    this._deletedAt = deletedAt

    this._atributes = atributes

    this.validate()
  }

	validate() {
		ProductValidatorFactory.create().validate(this);
	}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get cost(): number {
    return this._cost;
  }

  get price(): number {
    return this._price;
  }

  get promotionalPrice(): number | null {
    return this._promotionalPrice;
  }

  get category(): string {
    return this._category;
  }

  get createdAt(): Date | null {
    return this._createdAt
  }

  get updatedAt(): Date | null {
    return this._updatedAt
  }

  get deletedAt(): Date | null {
    return this._deletedAt
  }

  get attributes(): Attribute[] {
    return this._atributes
  }
}
