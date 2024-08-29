import { Entity } from "../../@shared/entity/entity-abstract";

export class Attribute extends Entity {
  private _key: string
  private _value: string
  private _stockQuantity: number

  constructor (
    id: string,
    key: string,
    value: string,
    stockQuantity: number
  ) {
    super()

    this._id = id
    this._key = key
    this._value = value
    this._stockQuantity = stockQuantity
  }

  get key(): string {
    return this._key
  }

  get value(): string {
    return this._value
  }

  get stockQuantity(): number {
    return this._stockQuantity
  }
}