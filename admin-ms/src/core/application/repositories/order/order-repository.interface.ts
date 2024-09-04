import { Order } from "@prisma/client";
import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}