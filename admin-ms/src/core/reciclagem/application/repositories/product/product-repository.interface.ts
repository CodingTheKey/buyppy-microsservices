import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";
import { Product } from "../../../domain/product/entity/product";
import { Attribute } from "../../../domain/product/value-objects/attribute";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  createWithAttributes(product: Product, attributes: Attribute[]): Promise<void>;
}