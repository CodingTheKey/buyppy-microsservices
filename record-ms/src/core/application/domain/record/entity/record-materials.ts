import { Entity } from "../../../../../@shared/entity/entity-abstract";
import type { Material } from "../../material/entity/material";

export class RecordMaterials extends Entity {
  private _weight: string;
  private _recordId: string;
  private _materials: Material[];

  constructor(
    id: string,
    weight: string,
    materialsIds: Material[],
    recordId: string
  ) {
    super();
    this._id = id;
    this._weight = weight;
    this._materials = materialsIds;
    this._recordId = recordId
  }

  get weight(): string {
    return this._weight;
  }

  get materials(): Material[] {
    return this._materials;
  }

  get recordId(): string {
    return this._recordId;
  }
}
