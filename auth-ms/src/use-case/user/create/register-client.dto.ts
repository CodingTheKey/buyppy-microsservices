export type RegisterClientDTO = {
	document: string;
	phone: string;
	email: string;
	name: string;
	password: string;
	address: {
		street: string;
		number: number;
		zip_code: string;
	};
};
