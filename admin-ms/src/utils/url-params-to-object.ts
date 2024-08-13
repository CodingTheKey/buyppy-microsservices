type GenericObject = { [key: string | number | symbol]: string }

export class UrlParamsToObject {
	execute(searchParams: URLSearchParams) {
		const result = {} as GenericObject

		for(const [key, value] of searchParams) {
			result[key] = value;
		}

		return result
	}
}
