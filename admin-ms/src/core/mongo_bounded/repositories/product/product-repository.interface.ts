import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";
import { Attribute } from "../../../domain/product/value-objects/attribute";
import { Product } from "../../domain/product/entity/product";


export interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  createWithAttributes(product: Product, attributes: Attribute[]): Promise<void>;
}