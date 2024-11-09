import type { RepositoryInterface } from "../../../../@shared/entity/repository/repository-interface";
import type { Record } from "../../domain/record/entity/record";
import type { RecordMaterials } from "../../domain/record/entity/record-materials";

export interface RecordRepositoryInterface extends RepositoryInterface<Record | RecordMaterials> { }