export interface RepositoryInterface<T> {
	create(entity: T): Promise<T | void>;
	update(entity: T): Promise<void>;
	find(id: string): Promise<T>;
	findAll(): Promise<T[]>;
	delete(id: string): Promise<void>
}
