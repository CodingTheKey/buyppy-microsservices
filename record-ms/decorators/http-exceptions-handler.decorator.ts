import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";

export function HTTPExceptionHandler(message: string = "Server Error"): any {
  return function(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (e: any) {
				console.error(e, 'error in decorator handler')
        const error = e instanceof Error ? e.message : 'Unknown error';
				let status: StatusCode = 500;

				if (e?.status) {
					status = e.status
				}

        throw new HTTPException(status, { message: JSON.stringify({ message , error: error }) });
      }
    };

		return descriptor
  };
}
