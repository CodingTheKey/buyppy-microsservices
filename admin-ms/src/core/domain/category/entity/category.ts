import { Entity } from "../../@shared/entity/entity-abstract";

export class Category extends Entity {
  private _title: string

  constructor(
    id: string,
    title: string
  ) {
    super()

    this._id = id
    this._title = title
  }

  get title() {
    return this._title
  }

  get id() {
    return this._id
  }
}