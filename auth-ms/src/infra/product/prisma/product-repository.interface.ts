import type { Product } from "@prisma/client";
import type { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}