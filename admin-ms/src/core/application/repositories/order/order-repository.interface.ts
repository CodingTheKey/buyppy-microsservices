import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";
import { Order } from "../../../domain/order/entity/order";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}