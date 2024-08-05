import { HTTPException } from "hono/http-exception";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";
import { CreateProductUseCase } from "../../../use-case/product/create/create-product.usecase";
import type { InputCreateProductDTO } from "../../../use-case/product/create/input-create-product.dto";

export class CreateProductController {
  async execute(input: InputCreateProductDTO) {
    const usecase = new CreateProductUseCase(new ProductRepository())

    try {
      await usecase.execute(input)
    } catch (e) {
      throw new HTTPException(500, { message: 'Error when trying to create new product!' })
    }
  }
}
