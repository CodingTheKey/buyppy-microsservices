import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";
import { Category } from "../../../domain/category/entity/category";

export interface CategoryRepositoryInterface extends RepositoryInterface<Category> {}
