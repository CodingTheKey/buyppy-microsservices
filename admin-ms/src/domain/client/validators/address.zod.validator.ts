import { z } from "zod";
import type ValidatorInterface from "../../@shared/entity/validator/validator.interface";
import type { Address } from "../value-object/address";

export class AddressZodValidator implements ValidatorInterface<Address> {
	validate(entity: Address) {
		const addressSchema = z.object({
			street: z.string(),
			number: z.number(),
			zipCode: z.string()
		});

		addressSchema.parse(entity);
	}
}
