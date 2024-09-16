import { Entity } from "../../@shared/entity/entity-abstract"
import { OrderValidatorFactory } from "../factory/order-validator.factory"
import { OrderItem } from "../value-objects/order-item"

export class Order extends Entity {
  private _clientId: string | null
  private _status: string | null
  private _total: number
  private _items: OrderItem[]
	private _clientName: string | null

  private _discountPercent: number | null
  private _paymentMethod: string | null

  private _refundReason: string | null
  private _canceleReason: string | null
  private _createdAt: Date | null = null

  constructor(
    id: string,
    clientId: string | null,
    status: string | null,
    total: number,
    items: OrderItem[],

    clientName: string | null = null,

    refundReason: string | null = null,

    canceleReason: string | null = null,

    discountPercent: number | null = null,
    paymentMethod: string | null = null
  ) {
    super()
    this._id = id
    this._clientId = clientId
    this._status = status
    this._total = total
    this._items = items
    this._clientName = clientName

    this._refundReason = refundReason

    this._canceleReason = canceleReason

    this._discountPercent = discountPercent
    this._paymentMethod = paymentMethod

    this.validate()
  }

  validate() {
    OrderValidatorFactory.create().validate(this)
  }

  cancelOrder(reason: string) {
    this._canceleReason = reason
    this._status = "CANCELED"
    this._createdAt = new Date()
  }

  setCreatedAt(createdAt: Date | null) {
    this._createdAt = createdAt
  }

  get clientId(): string | null {
    return this._clientId;
  }

  get status(): string | null {
    return this._status;
  }

  get total(): number {
    return this._total;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get clientName(): string | null {
    return this._clientName
  }

  get refundReason(): string | null {
    return this._refundReason;
  }

  get canceleReason(): string | null {
    return this._canceleReason;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  get discountPercent(): number | null {
    return this._discountPercent
  }

  get paymentMethod(): string | null {
    return this._paymentMethod
  }
}