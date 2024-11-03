import { ZodSchema } from "zod";

export abstract class Entity {
	protected _schema!: ZodSchema;

	get schema(): ZodSchema {
		return this._schema;
	}
}
