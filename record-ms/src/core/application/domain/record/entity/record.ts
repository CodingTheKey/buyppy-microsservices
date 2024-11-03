import { Entity } from "../../../../../@shared/entity/entity-abstract";

export class Record extends Entity {
  private _weight: string;
  private _materialId: string;

  constructor(
    id: string,
    weight: string,
    materialId: string,
  ) {
    super();
    this._id = id;
    this._weight = weight;
    this._materialId = materialId;
  }

  get weight(): string {
    return this._weight;
  }

  get materialId(): string {
    return this._materialId;
  }
}
