import { Entity } from "../../../../../@shared/entity/entity-abstract";

export class Record extends Entity {
  private _weight: string;
  private _materialsIds: string[];

  constructor(
    id: string,
    weight: string,
    materialsIds: string[],
  ) {
    super();
    this._id = id;
    this._weight = weight;
    this._materialsIds = materialsIds;
  }

  get weight(): string {
    return this._weight;
  }

  get materialsIds(): string[] {
    return this._materialsIds;
  }

  setWeight(weight: string): void {
    this._weight = weight;
  }
}
