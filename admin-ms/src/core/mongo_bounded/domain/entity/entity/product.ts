import { Entity as EntityAbstract } from "../../../@shared/entity/entity-abstract";
import { ProductValidator } from "../validators/product.validator";

export class Entity extends EntityAbstract {
  private _props: unknown
  constructor(props: unknown) {
    super();

    this._props = props;

    // this._schema = schema;

    // this._props = this.validate()
  }

  private validate() {
    return ProductValidator.validate(this._schema, this._props);
  }

  get props(): unknown {
    return this._props
  }
}