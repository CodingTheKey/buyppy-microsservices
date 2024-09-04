import { HTTPExceptionHandler } from "../../../../decorators/http-exceptions-handler.decorator";
import type { Context } from "../../../../types";
import { UrlParamsToObject } from "../../../../utils/url-params-to-object";
import { ClientRepository } from "../../../application/repositories/client/repository/prisma/client.repository";
import { FetchUserByOrganizationUseCase } from "../../../application/use-case/client/fetchByOrganization/fetchByOrganization.usecase";

export interface FetchUsersByOrganizationDTO {
  organization_id: string
}

export class FetchByOrganizationController {
  @HTTPExceptionHandler()
	async fetchByOrganization(c: Context) {
		const rawInput = await c.req.url;
		const urlPramsUtil = new UrlParamsToObject()

		const params = new URL(rawInput).searchParams
		const input = urlPramsUtil.execute(params)

		const usecase = new FetchUserByOrganizationUseCase(new ClientRepository());
		const result = await usecase.execute(input.organization_id);

		return c.newResponse(JSON.stringify({ data: result }), 200);
	}
}
