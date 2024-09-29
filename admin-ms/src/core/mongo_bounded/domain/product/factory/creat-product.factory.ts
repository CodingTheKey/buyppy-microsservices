import { ZodSchema } from "zod";
import { Product } from "../entity/product";

export class CreateProductFactory {
  static create(input: unknown, schema: ZodSchema): Product {
    return {}
  }
}