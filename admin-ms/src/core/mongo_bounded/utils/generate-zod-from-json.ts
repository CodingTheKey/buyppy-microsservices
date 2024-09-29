import { z, ZodTypeAny } from "zod";

const typeMapping: { [key: string]: ZodTypeAny } = {
  string: z.string(),
  number: z.number(),
  boolean: z.boolean(),
};

export class JsonToZodSchema {
  static generate(validatorObj: { [key: string]: string }): z.ZodObject<any> {
  const shape: { [key: string]: ZodTypeAny } = {};

  for (const key in validatorObj) {
    const typeString = validatorObj[key];
    const zodType = typeMapping[typeString];

    if (zodType) {
      shape[key] = zodType;
    } else {
      shape[key] = z.any(); // Tipo padrão se o tipo não for reconhecido
      console.warn(`Tipo não reconhecido para a chave "${key}": "${typeString}". Usando z.any().`);
    }
  }

  return z.object(shape);
}
}