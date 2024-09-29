import { Product } from "../../../domain/product/entity/product";

export class ProductMapper {
  static execute(entity: Product) {
    return entity.props
  }
}
