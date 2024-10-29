import { Record } from "../../../domain/record/entity/record";
import { RecordRepositoryInterface } from "../record-repository.interface";

export class RecordRepository implements RecordRepositoryInterface {
  create(entity: Record): Promise<void | Record> {
    throw new Error("Method not implemented.");
  }
  update(entity: Record): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Record> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Record[]> {
    throw new Error("Method not implemented.");
  }
}