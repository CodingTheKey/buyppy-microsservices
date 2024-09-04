import { Entity } from "../../@shared/entity/entity-abstract";
import { OrderItemValidatorFactory } from "../factory/order-item-validator.factory";

export class OrderItem extends Entity {
  private _orderId: string
  private _productId: string
  private _quantity: number
  private _price: number
  private _productAttributeId: string | null

  constructor(
    id: string,
    orderId: string,
    productId: string,
    quantity: number,
    price: number,
    productAttributeId: string | null = null,
  ) {
    super()

    this._id = id
    this._orderId = orderId
    this._productId = productId
    this._quantity = quantity
    this._price = price

    this._productAttributeId = productAttributeId

    this.validate()
  }

  validate() {
    OrderItemValidatorFactory.create().validate(this)
  }

  get orderId(): string {
    return this._orderId;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get productAttributeId(): string | null {
    return this._productAttributeId;
  }
}
