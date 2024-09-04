import { Entity } from "../../@shared/entity/entity-abstract";

export class Attribute extends Entity {
  private _key: string
  private _value: string
  private _stockQuantity: number
  private _stockId: string | null

  constructor (
    id: string,
    key: string,
    value: string,
    stockQuantity: number,
    stockId: string | null = null
  ) {
    super()

    this._id = id
    this._key = key
    this._value = value
    this._stockQuantity = stockQuantity
    this._stockId = stockId
  }

  get id(): string {
    return this._id
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

  get stockId(): string | null {
    return this._stockId
  }
}