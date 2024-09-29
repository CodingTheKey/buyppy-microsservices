import { ZodSchema } from "zod";
import { Entity } from "../../../@shared/entity/entity-abstract";
import { ProductValidator } from "../validators/product.validator";

export class Product extends Entity{
  private _props: unknown
  constructor(schema: ZodSchema, props: unknown) {
    super();

    this._props = props;

    this._schema = schema;

    this._props = this.validate()
  }

  private validate() {
    return ProductValidator.validate(this._schema, this._props);
  }

  get props(): unknown {
    return this._props
  }
}