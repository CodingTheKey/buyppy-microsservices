import { Entity } from "../../../domain/entity/entity/product";

export class ProductMapper {
  static execute(entity: Entity) {
    return entity.props
  }
}
