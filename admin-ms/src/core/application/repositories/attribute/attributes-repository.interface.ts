import { RepositoryInterface } from "../../../domain/@shared/entity/repository/repository-interface";
import { Attribute } from "../../../domain/product/value-objects/attribute";

export interface AttributesRepositoryInterface extends RepositoryInterface<Attribute> { }