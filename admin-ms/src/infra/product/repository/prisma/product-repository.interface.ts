import type { RepositoryInterface } from "../../../../domain/@shared/entity/repository/repository-interface";
import type { Product } from "../../../../domain/product/entity/product";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}