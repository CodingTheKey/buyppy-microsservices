import { RepositoryInterface as RepositoryInterfaceDefault } from "../../domain/@shared/entity/repository/repository-interface";
import { Entity } from "../@shared/entity/entity-abstract";

export interface RepositoryInterface extends RepositoryInterfaceDefault<Entity> {}