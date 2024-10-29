import { Material } from "../../../domain/material/entity/material";
import { MaterialsRepositoryInterface } from "../materials-repository.interface";

export class MaterialRepository implements MaterialsRepositoryInterface {
  create(entity: Material): Promise<void | Material> {
    throw new Error("Method not implemented.");
  }
  update(entity: Material): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Material> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Material[]> {
    throw new Error("Method not implemented.");
  }
}