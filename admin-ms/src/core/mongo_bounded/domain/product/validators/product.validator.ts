import { ZodSchema } from "zod";

export class ProductValidator {
  public static validate(schema: ZodSchema, props: unknown) {
    return schema.parse(props);
  }
}