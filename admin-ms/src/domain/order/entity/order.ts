import { Entity } from "../../@shared/entity/entity-abstract"
import { OrderValidatorFactory } from "../factory/order-validator.factory"
import { OrderItem } from "../value-objects/order-item"

export class Order extends Entity {
  private _clientId: string
  private _status: string | null
  private _total: number
  private _items: OrderItem[]

  private _refundedAt: Date | null
  private _refundReason: string | null

  private _canceledAt: Date | null
  private _canceleReason: string | null

  private _createdAt: Date | null
  private _updatedAt: Date | null
  private _deletedAt: Date | null

  constructor(
    id: string,
    clientId: string,
    status: string | null,
    total: number,
    items: OrderItem[],

    refundedAt: Date | null = null,
    refundReason: string | null = null,

    canceledAt: Date | null = null,
    canceleReason: string | null = null,

    createdAt: Date | null = null,
    updatedAt: Date | null = null,
    deletedAt: Date | null = null,
  ) {
    super()
    this._id = id
    this._clientId = clientId
    this._status = status
    this._total = total
    this._items = items

    this._refundedAt = refundedAt
    this._refundReason = refundReason

    this._canceledAt = canceledAt
    this._canceleReason = canceleReason

    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._deletedAt = deletedAt

    this.validate()
  }

  validate() {
    OrderValidatorFactory.create().validate(this)
  }

  get clientId(): string {
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

  get refundedAt(): Date | null {
    return this._refundedAt;
  }

  get refundReason(): string | null {
    return this._refundReason;
  }

  get canceledAt(): Date | null {
    return this._canceledAt;
  }

  get canceleReason(): string | null {
    return this._canceleReason;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }
}