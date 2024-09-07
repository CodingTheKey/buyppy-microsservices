import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";
import { Category } from "../../../domain/product/value-objects/category";

export interface CategoryRepositoryInterface extends RepositoryInterface<Category> {}
