import { UserRepository } from "../../../infra/client/repository/prisma/client.repository";
import type { Context } from "../../../types";
import { FetchUserByOrganizationUseCase } from "../../../use-case/user/fetchByOrganization/fetchByOrganization.usecase";
import { UrlParamsToObject } from "../../../utils/url-params-to-object";

export interface FetchUsersByOrganizationDTO {
  organization_id: string
}

export class FetchByOrganizationController {
	async fetchByOrganization(c: Context) {
		try {
			const rawInput = await c.req.url;
      const urlPramsUtil = new UrlParamsToObject()

      const params = new URL(rawInput).searchParams
      const input = urlPramsUtil.execute(params)

			const usecase = new FetchUserByOrganizationUseCase(new UserRepository());
			const result = await usecase.execute(input.organization_id);

			return new Response(JSON.stringify(result));
		// biome-ignore lint/suspicious/noExplicitAny: <error must be of type any in all cases>
		} catch (err: any) {
			console.error(err);
			return new Response(JSON.stringify({ message: err.message }), {
				status: 400,
			});
		}
	}
}
