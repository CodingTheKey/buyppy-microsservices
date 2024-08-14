import { HTTPException } from "hono/http-exception";

export function HTTPExceptionHandler(message: string = "Server Error"): any {
  return function(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (e) {
				console.error(e, 'error in decorator handler')
        const error = e instanceof Error ? e.message : 'Unknown error';
        throw new HTTPException(500, { message: JSON.stringify({ message , error: JSON.parse(error) }) });
      }
    };

		return descriptor
  };
}
