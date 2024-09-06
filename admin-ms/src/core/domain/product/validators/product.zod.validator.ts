

import { z } from "zod";
import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import type { Product } from "../entity/product";

export class ProductZodValidator implements ValidatorInterface<Product> {
	validate(entity: Product) {
    const productSchema = z.object({
      id: z.string().min(1),
      name: z.string().min(3),
      code: z.string().min(1),
      cost: z.number().min(0),
      price: z.number().min(0),
      promotionalPrice: z.number().min(0).optional(),
      categoryId: z.string().min(1)
    });

		productSchema.parse(entity);
	}
}
