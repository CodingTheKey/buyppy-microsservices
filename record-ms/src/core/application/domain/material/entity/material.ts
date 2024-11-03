import { Entity } from "../../../../../@shared/entity/entity-abstract";

export class Material extends Entity {
  private _name: string;
  private _price: string;

  constructor(
    id: string,
    name: string,
    price: string,
  ) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
  }

  get name(): string {
    return this._name;
  }

  get price(): string {
    return this._price;
  }
}